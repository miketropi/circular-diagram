import CircularDiagram from './components/CircularDiagram'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import image1 from '/icon-01.png'
import image2 from '/icon-02.png'
import image3 from '/icon-03.png'
import image4 from '/icon-04.png'
import image5 from '/icon-05.png'
import centerImage from '/center-image.png'

const CircularDiagramData = [
  {
    id: uuidv4(),
    title: 'MEANINGFUL OUTCOMES',
    color: '#FF6B35',
    icon: image1,
    items: [
      {
        id: uuidv4(),
        label: 'Create & Innovate',
        description: 'Focus on creating and delivering impactful outcomes.'
      },
      {
        id: uuidv4(),
        label: 'Empowerment',
        description: 'Focus on creating and delivering impactful outcomes.'
      },
      {
        id: uuidv4(),
        label: 'Think Problem-Solve',
        description: 'Focus on creating and delivering impactful outcomes.'
      },
      {
        id: uuidv4(),
        label: 'Plan & Organise',
        description: 'Focus on creating and delivering impactful outcomes.'
      },
    ],
  },
  {
    id: uuidv4(),
    title: 'RELATIONSHIPS',
    color: '#2E8B57',
    icon: image2,
    items: [
      {
        id: uuidv4(),
        label: 'Create & Innovate',
        description: 'Focus on creating and delivering impactful outcomes.'
      },
      {
        id: uuidv4(),
        label: 'Empowerment',
        description: 'Focus on creating and delivering impactful outcomes.'
      },
      {
        id: uuidv4(),
        label: 'Think Problem-Solve',
        description: 'Focus on creating and delivering impactful outcomes.'
      },
      {
        id: uuidv4(),
        label: 'Plan & Organise',
        description: 'Focus on creating and delivering impactful outcomes.'
      },
    ],
  },
  {
    id: uuidv4(),
    title: 'PEOPLE LEADERSHIP',
    color: '#1F9C9C',
    icon: image3,
    items: [
      {
        id: uuidv4(),
        label: 'Create & Innovate',
        description: 'Focus on creating and delivering impactful outcomes.'
      },
      {
        id: uuidv4(),
        label: 'Empowerment',
        description: 'Focus on creating and delivering impactful outcomes.'
      },
      {
        id: uuidv4(),
        label: 'Think Problem-Solve',
        description: 'Focus on creating and delivering impactful outcomes.'
      },
      {
        id: uuidv4(),
        label: 'Plan & Organise',
        description: 'Focus on creating and delivering impactful outcomes.'
      },
    ],
  },
  {
    id: uuidv4(),
    title: 'ONE CQ',
    color: '#3450D9',
    icon: image4,
    items: [
      {
        id: uuidv4(),
        label: 'Create & Innovate',
        description: 'Focus on creating and delivering impactful outcomes.'
      },
      {
        id: uuidv4(),
        label: 'Empowerment',
        description: 'Focus on creating and delivering impactful outcomes.'
      },
      {
        id: uuidv4(),
        label: 'Think Problem-Solve',
        description: 'Focus on creating and delivering impactful outcomes.'
      },
      {
        id: uuidv4(),
        label: 'Plan & Organise',
        description: 'Focus on creating and delivering impactful outcomes.'
      },
    ],
  },
  {
    id: uuidv4(),
    title: 'BUSINESS MINDSET',
    color: '#816DA0',
    icon: image5,
    items: [
      {
        id: uuidv4(),
        label: 'Create & Innovate',
        description: 'Focus on creating and delivering impactful outcomes.'
      },
      {
        id: uuidv4(),
        label: 'Empowerment',
        description: 'Focus on creating and delivering impactful outcomes.'
      },
      {
        id: uuidv4(),
        label: 'Think Problem-Solve',
        description: 'Focus on creating and delivering impactful outcomes.'
      },
      {
        id: uuidv4(),
        label: 'Plan & Organise',
        description: 'Focus on creating and delivering impactful outcomes.'
      },
    ],
  },
]

function App() {
  return (
    <div style={{ width: `100%`, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularDiagram 
        CircularDiagramData={ CircularDiagramData } 
        CenterImage={ centerImage }  
        onClick={(section) => console.log(section)}
        fontFamily="Arial"
      />
    </div>
  )
} 

export default App
