import { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import { darkenHexColor } from '../util/helpers';

const CircularDiagram = ({ CircularDiagramData, CenterImage, onClick, fontFamily, parentActive }) => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const canvasSize = 740;
  const centerX = canvasSize / 2;
  const centerY = canvasSize / 2;
  const radius = canvasSize / 2;

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
    drawCenterContent(fabricCanvas);
    
    // Cleanup
    return () => {
      fabricCanvas.dispose();
    };
  }, [parentActive]);

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
      const opacity = parentActive ? parentActive === section.id ? 1 : 0.3 : 1;
      const parentId = section.id;

      drawSection(fabricCanvas, section, startAngle, endAngle, radius, "pointer", opacity);
      
      let __radius = radius;
      section.items.forEach((element, __index) => {
        __radius = __radius - 38; //__radius * 0.85;
        drawSection(fabricCanvas, {
          id: element.id,
          title: element.label,
          color: __index % 2 ? `#F4FCFE` : `#ffffff`,
          textColor: `#000`,
          parentId,
        }, startAngle, endAngle, __radius, "pointer", opacity);
      });

      __radius = __radius - 38; // __radius * 0.85

      drawSection(fabricCanvas, {
        title: '',
        color: `white`,
        textColor: `black`,
      }, startAngle, endAngle, __radius, "default", opacity);

      __radius = __radius - 20; // __radius * 0.85

      drawSection(fabricCanvas, {
        title: '',
        color: section.color,
        textColor: `#000`,
      }, startAngle, endAngle, __radius, "default", opacity);

      drawIconCircle(fabricCanvas, section, startAngle, endAngle, __radius - (38 / 2), opacity);

      currentAngle = endAngle + gapInRadians;
    });
  };

  const drawSection = (fabricCanvas, section, startAngle, endAngle, radius, hoverCursor = "default", opacity = 1) => {
    const outerRadius = radius;
    const innerRadius = radius - 38; // radius * 0.85;
    
    const pathString = createArcPath(centerX, centerY, innerRadius, outerRadius, startAngle, endAngle);
    
    const sectionPath = new fabric.Path(pathString, {
      perPixelTargetFind: true,
      targetFindTolerance: 0,
      fill: section.color,
      stroke: 'white',
      strokeWidth: 2,
      selectable: false,
      // evented: false,
      hoverCursor,
      opacity
    });

    if(section.id) {
      sectionPath.on('mousedown', () => {
        // console.log(section);
        onClick ? onClick(section) : null;
      });

      sectionPath.on('mouseover', () => {
        // console.log(darkenHexColor(section.color, 50), section.color)
        sectionPath.set({ fill: darkenHexColor(section.color, 10) });
        fabricCanvasRef.current.renderAll();
      });

      sectionPath.on('mouseout', () => {
        sectionPath.set({ fill: section.color });
        fabricCanvasRef.current.renderAll();
      });
    }
    
    
    fabricCanvas.add(sectionPath);
    
    // Add curved title text
    const textColor = section.textColor || 'white';
    drawCurvedText(fabricCanvas, section.title, startAngle, endAngle, innerRadius, outerRadius, textColor, opacity);
  };

  const drawCurvedText = (fabricCanvas, text, startAngle, endAngle, innerRadius, outerRadius, color = 'white', opacity) => {
    const textRadius = outerRadius - (38 / 2) // - (outerRadius / 12);
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
            fontFamily: fontFamily || 'Arial',
            fontSize: fontSize,
            fontWeight: 'normal',
            opacity
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
            evented: false,
            opacity
        });
        
        fabricCanvas.add(textObj);
        
        // Move to next character position
        currentAngle += charWidth / textRadius;
        if (i < text.length - 1) {
            currentAngle += letterSpacing / textRadius;
        }
    }
  };

  const drawIconCircle = async (fabricCanvas, section, startAngle, endAngle, radius, opacity = 1) => {
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
      evented: false,
      opacity: 1
    });
    
    fabricCanvas.add(circle);

    const img = await fabric.FabricImage.fromURL(section.icon);
    img.set({
      left: iconX,
      top: iconY,
      originX: 'center',
      originY: 'center',
      scaleX: 0.6,
      scaleY: 0.6,
      selectable: false,
      evented: false,
      opacity
    });

    fabricCanvas.add(img);
    
    
    // fabricCanvas.add(iconText);
  };

  const drawCenterContent = async (fabricCanvas) => {
    // Center circle
    const centerCircle = new fabric.Circle({
      left: centerX,
      top: centerY,
      radius: 64,
      fill: 'white',
      stroke: '#ddd',
      strokeWidth: 1,
      originX: 'center',
      originY: 'center',
      selectable: false,
      evented: false
    });
    
    
    const centerImg = await fabric.FabricImage.fromURL(CenterImage);
    centerImg.set({
      left: centerX,
      top: centerY,
      originX: 'center',
      originY: 'center',
      scaleX: 0.8,
      scaleY: 0.8,
      selectable: false,
      evented: false
    });
    
    fabricCanvas.add(centerCircle);
    fabricCanvas.add(centerImg);
  };

  return (
    <canvas 
      ref={canvasRef}
      style={{ 
        // border: '1px solid #ddd',
        // borderRadius: '8px'
      }}
    />
  );
};

export default CircularDiagram;