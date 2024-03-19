const b = {
  file1: {
    Q1: { topic: [Array], marks: 7, type: 'theory' },
    Q2: { topic: [Array], marks: 7, type: 'theory' },
    Q3: { topic: [Array], marks: 7, type: 'theory' },
    Q4: { topic: [Array], marks: 7, type: 'theory' },
    Q5: { topic: [Array], marks: 7, type: 'theory' }
  },
  file2: {
    Q1: { topic: [Array], marks: 7, type: 'theory' },
    Q2: { topic: [Array], marks: 7, type: 'theory' },
    Q3: { topic: [Array], marks: 7, type: 'theory' },
    Q4: { topic: [Array], marks: 7, type: 'theory' },
    Q5: { topic: [Array], marks: 7, type: 'theory' }
  }
} is here
{
  file1: {
    Q1: { topic: [Array], marks: 7, type: 'theory' },
    Q2: { topic: [Array], marks: 7, type: 'theory' },
    Q3: { topic: [Array], marks: 7, type: 'theory' },
    Q4: { topic: [Array], marks: 7, type: 'theory' },
    Q5: { topic: [Array], marks: 7, type: 'theory' }
  },
  file2: {
    Q1: { topic: [Array], marks: 7, type: 'theory' },
    Q2: { topic: [Array], marks: 7, type: 'theory' },
    Q3: { topic: [Array], marks: 7, type: 'theory' },
    Q4: { topic: [Array], marks: 7, type: 'theory' },
    Q5: { topic: [Array], marks: 7, type: 'theory' }
  }
} is here

const initEdges = [
  { "id": "e1-2", "source": "1", "sourceHandle": "source", "target": "2", "targetHandle": "target" },
  { "id": "e1-3", "source": "1", "sourceHandle": "source", "target": "3", "targetHandle": "target" },
  { "id": "e1-4", "source": "1", "sourceHandle": "source", "target": "4", "targetHandle": "target" }
]
const initNodes =  [
  {
    "id": "1",
    "type": "custom",
    "data": { "name": "File 2" },
    "position": { "x": 50, "y": 400 }
  },
  {
    "id": "2",
    "type": "custom",
    "data": { "name": "(a) Explain if-elif-else control structure in Python.", "total_marks": 3, "type": "theory" },
    "position": { "x": 300, "y": 200 }
  },
  {
    "id": "3",
    "type": "custom",
    "data": { "name": "(b) Explain type casting in Python.", "total_marks": 4, "type": "theory" },
    "position": { "x": 350, "y": 600 }
  },
  {
    "id": "4",
    "type": "custom",
    "data": { "name": "(c) Explain features of Python programming language.", "total_marks": 7, "type": "theory" },
    "position": { "x": 450, "y": 100 }
  }
]