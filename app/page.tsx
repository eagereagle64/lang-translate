import TranslationForm from './components/TranslationForm'

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Language Translator</h1>
      <TranslationForm />
    </main>
  )
}

