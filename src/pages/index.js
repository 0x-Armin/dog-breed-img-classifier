import DogBreedClassifier from "@/components/DogBreedClassifier"

export default function Home() {
  return (
    <div id='main-container'>
      <h1>Dog Breed Classifier</h1>
      <p>Have you always wanted to find out what breed is that cute dog you saw on the street?</p>
      <p>Here's Dog Breed Classifier- a tool that will help you to do just so!</p>
      <DogBreedClassifier />
    </div>
  )
}