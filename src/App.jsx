import CircularDiagram from './components/CircularDiagram'
import './App.css'
import { v4 as uuidv4 } from 'uuid';

const CircularDiagramData = [
  {
    id: uuidv4(),
    title: 'MEANINGFUL OUTCOMES',
    color: '#FF6B35',
    startAngle: -Math.PI / 2,
    endAngle: 0,
    icon: '📊',
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
    startAngle: -Math.PI / 2,
    endAngle: 0,
    icon: '📊',
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
    startAngle: -Math.PI / 2,
    endAngle: 0,
    icon: '📊',
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
    startAngle: -Math.PI / 2,
    endAngle: 0,
    icon: '📊',
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
    startAngle: -Math.PI / 2,
    endAngle: 0,
    icon: '📊',
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
      <CircularDiagram CircularDiagramData={ CircularDiagramData } />
    </div>
  )
} 

export default App
