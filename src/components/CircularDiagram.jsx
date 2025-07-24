import { useEffect, useRef } from 'react';
import * as fabric from 'fabric';

const CircularDiagram = ({ CircularDiagramData }) => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const canvasSize = 740;
  const centerX = canvasSize / 2;
  const centerY = canvasSize / 2;
  const radius = 340;

  useEffect(() => {
    // Initialize Fabric.js canvas
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: canvasSize,
      height: canvasSize,
      backgroundColor: 'white',
      preserveObjectStacking: true
    });
    
    fabricCanvasRef.current = fabricCanvas;
    
    // Draw sections
    drawSections(fabricCanvas);
    
    // Draw center content
    // drawCenterContent(fabricCanvas);
    
    // Cleanup
    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  const createArcPath = (centerX, centerY, innerRadius, outerRadius, startAngle, endAngle) => {
    const startX1 = centerX + outerRadius * Math.cos(startAngle);
    const startY1 = centerY + outerRadius * Math.sin(startAngle);
    const endX1 = centerX + outerRadius * Math.cos(endAngle);
    const endY1 = centerY + outerRadius * Math.sin(endAngle);
    
    const startX2 = centerX + innerRadius * Math.cos(endAngle);
    const startY2 = centerY + innerRadius * Math.sin(endAngle);
    const endX2 = centerX + innerRadius * Math.cos(startAngle);
    const endY2 = centerY + innerRadius * Math.sin(startAngle);
    
    const largeArcFlag1 = endAngle - startAngle > Math.PI ? 1 : 0;
    const largeArcFlag2 = endAngle - startAngle > Math.PI ? 1 : 0;
    
    return `M ${startX1} ${startY1} 
            A ${outerRadius} ${outerRadius} 0 ${largeArcFlag1} 1 ${endX1} ${endY1}
            L ${startX2} ${startY2}
            A ${innerRadius} ${innerRadius} 0 ${largeArcFlag2} 0 ${endX2} ${endY2}
            Z`;
  };

  const drawSections = (fabricCanvas) => {
    const totalSections = CircularDiagramData.length;
    const gapInDegrees = 3;
    const totalGapDegrees = totalSections * gapInDegrees;
    const availableDegrees = 360 - totalGapDegrees;
    const degreesPerSection = availableDegrees / totalSections;

    const radiansPerSection = (degreesPerSection * Math.PI) / 180;
    const gapInRadians = (gapInDegrees * Math.PI) / 180;

    let currentAngle = -Math.PI / 2;

    CircularDiagramData.forEach((section, index) => {
      const startAngle = currentAngle;
      const endAngle = currentAngle + radiansPerSection;

      drawSection(fabricCanvas, section, startAngle, endAngle, radius);
      
      // drawSectionItems(fabricCanvas, section, startAngle, endAngle);
      let __radius = radius;
      section.items.forEach((element, __index) => {
        __radius = __radius * 0.85;
        drawSection(fabricCanvas, {
          title: element.label,
          color: __index % 2 ? `#eee` : `#fafafa`,
          textColor: `#000`,
        }, startAngle, endAngle, __radius);
      });

      __radius = __radius * 0.85

      drawSection(fabricCanvas, {
        title: '',
        color: `white`,
        textColor: `black`,
      }, startAngle, endAngle, __radius);

      __radius = __radius * 0.85

      drawSection(fabricCanvas, {
        title: '',
        color: section.color,
        textColor: `#000`,
      }, startAngle, endAngle, __radius);

      drawIconCircle(fabricCanvas, section, startAngle, endAngle, __radius * .92);

      currentAngle = endAngle + gapInRadians;
    });
  };

  const drawSection = (fabricCanvas, section, startAngle, endAngle, radius) => {
    const outerRadius = radius;
    const innerRadius = radius * 0.85;
    
    const pathString = createArcPath(centerX, centerY, innerRadius, outerRadius, startAngle, endAngle);
    
    const sectionPath = new fabric.Path(pathString, {
      perPixelTargetFind: true,
      targetFindTolerance: 0,
      fill: section.color,
      stroke: 'white',
      strokeWidth: 2,
      selectable: false,
      // evented: false,
      hoverCursor: "pointer"
    });

    sectionPath.on('mousedown', () => {
      console.log(`Section clicked: ${section.title}`);
    });
    
    fabricCanvas.add(sectionPath);
    
    // Add curved title text
    const textColor = section.textColor || 'white';
    drawCurvedText(fabricCanvas, section.title, startAngle, endAngle, innerRadius, outerRadius, textColor);
  };

  const drawCurvedText = (fabricCanvas, text, startAngle, endAngle, innerRadius, outerRadius, color = 'white') => {
    const textRadius = outerRadius - (outerRadius / 14);
    const angleSpan = endAngle - startAngle;
    
    // Font settings
    const fontSize = 12;
    const letterSpacing = 2; // Spacing between characters (pixels)
    
    // Get width of each character
    const charWidths = [];
    let totalWidth = 0;
    
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const charText = new fabric.Text(char, {
            fontFamily: 'Arial',
            fontSize: fontSize,
            fontWeight: 'normal'
        });
        const width = charText.width;
        charWidths.push(width);
        totalWidth += width;
        if (i < text.length - 1) {
            totalWidth += letterSpacing;
        }
    }
    
    // Convert pixel width to angular width
    const angularWidth = totalWidth / textRadius;
    
    // Center the text in the section
    const textStartAngle = startAngle + (angleSpan - angularWidth) / 2;
    
    // Draw each character
    let currentAngle = textStartAngle;
    
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const charWidth = charWidths[i];
        
        // Calculate angle for center of character
        const charCenterAngle = currentAngle + (charWidth / 2) / textRadius;
        
        // Calculate position
        const x = centerX + textRadius * Math.cos(charCenterAngle);
        const y = centerY + textRadius * Math.sin(charCenterAngle);
        
        const textObj = new fabric.Text(char, {
            left: x,
            top: y,
            fontFamily: 'Arial',
            fontSize: fontSize,
            fill: color,
            fontWeight: 'bold',
            originX: 'center',
            originY: 'center',
            angle: (charCenterAngle * 180 / Math.PI) + 90,
            selectable: false,
            evented: false
        });
        
        fabricCanvas.add(textObj);
        
        // Move to next character position
        currentAngle += charWidth / textRadius;
        if (i < text.length - 1) {
            currentAngle += letterSpacing / textRadius;
        }
    }
  };

  const drawIconCircle = (fabricCanvas, section, startAngle, endAngle, radius) => {
    const midAngle = (startAngle + endAngle) / 2;
    const iconRadius = radius;
    const iconX = centerX + iconRadius * Math.cos(midAngle);
    const iconY = centerY + iconRadius * Math.sin(midAngle);
    
    const circle = new fabric.Circle({
      left: iconX,
      top: iconY,
      radius: 25,
      fill: 'white',
      stroke: section.color,
      strokeWidth: 3,
      originX: 'center',
      originY: 'center',
      selectable: false,
      evented: false
    });
    
    const iconText = new fabric.Text(section.icon, {
      left: iconX,
      top: iconY,
      fontSize: 20,
      fill: section.color,
      originX: 'center',
      originY: 'center',
      selectable: false,
      evented: false
    });
    
    fabricCanvas.add(circle);
    fabricCanvas.add(iconText);
  };

  const drawSectionItems = (fabricCanvas, section, startAngle, endAngle) => {
    const midAngle = (startAngle + endAngle) / 2;
    const itemRadius = (radius * 0.7 + radius) / 2;
    
    section.items.forEach((item, index) => {
      const itemAngle = midAngle + (index - section.items.length / 2 + 0.5) * 0.15;
      const itemX = centerX + itemRadius * Math.cos(itemAngle);
      const itemY = centerY + itemRadius * Math.sin(itemAngle);
      
      const itemText = new fabric.Text(item.label, {
        left: itemX,
        top: itemY,
        fontSize: 10,
        fill: 'white',
        originX: 'center',
        originY: 'center',
        angle: itemAngle > Math.PI/2 && itemAngle < 3*Math.PI/2 ? 
               (itemAngle * 180 / Math.PI) + 90 : 
               (itemAngle * 180 / Math.PI) - 90,
        selectable: false,
        evented: false
      });
      
      fabricCanvas.add(itemText);
    });
  };

  const drawCenterContent = (fabricCanvas) => {
    // Center circle
    const centerCircle = new fabric.Circle({
      left: centerX,
      top: centerY,
      radius: 80,
      fill: 'white',
      stroke: '#ddd',
      strokeWidth: 1,
      originX: 'center',
      originY: 'center',
      selectable: false,
      evented: false
    });
    
    // Center icon
    const centerIconCircle = new fabric.Circle({
      left: centerX,
      top: centerY - 20,
      radius: 25,
      fill: '#E91E63',
      originX: 'center',
      originY: 'center',
      selectable: false,
      evented: false
    });
    
    const centerIcon = new fabric.Text('🎯', {
      left: centerX,
      top: centerY - 20,
      fontSize: 20,
      fill: 'white',
      originX: 'center',
      originY: 'center',
      selectable: false,
      evented: false
    });
    
    // Center texts
    const centerTexts = [
      'Cultural Awareness',
      'Living Our Values', 
      'Success Orientated',
      'Collaborative Mindset'
    ];
    
    centerTexts.forEach((text, index) => {
      const textObj = new fabric.Text(text, {
        left: centerX,
        top: centerY + 10 + (index * 12),
        fontSize: 11,
        fill: '#333',
        originX: 'center',
        originY: 'center',
        selectable: false,
        evented: false
      });
      fabricCanvas.add(textObj);
    });
    
    // Bottom section
    const bottomPath = createArcPath(centerX, centerY, 80, radius * 0.7, Math.PI * 0.3, Math.PI * 0.7);
    const bottomSection = new fabric.Path(bottomPath, {
      fill: '#3498DB',
      selectable: false,
      evented: false
    });
    
    const oneCQText = new fabric.Text('ONE CQ', {
      left: centerX,
      top: centerY + 100,
      fontSize: 14,
      fill: 'white',
      fontWeight: 'bold',
      originX: 'center',
      originY: 'center',
      selectable: false,
      evented: false
    });
    
    fabricCanvas.add(centerCircle);
    fabricCanvas.add(centerIconCircle);
    fabricCanvas.add(centerIcon);
    fabricCanvas.add(bottomSection);
    fabricCanvas.add(oneCQText);
  };

  return (
    <canvas 
      ref={canvasRef}
      style={{ 
        border: '1px solid #ddd',
        borderRadius: '8px'
      }}
    />
  );
};

export default CircularDiagram;