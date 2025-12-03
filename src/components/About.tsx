export default function About() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-black mb-6">About This Platform</h1>

      <div className="space-y-6 text-black">
        <section>
          <h2 className="text-xl font-bold mb-2">Overview</h2>
          <p className="leading-relaxed">
            This platform contains 500 practice questions covering all major content areas including pharmacology, assessment, ethics, diagnostic criteria, and more.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-2">Content Areas</h2>
          <ul className="list-disc list-inside space-y-1 leading-relaxed">
            <li>Pharmacology (98 questions)</li>
            <li>Diagnostic Criteria (DSM-5) (26 questions)</li>
            <li>Ethics & Legal Issues (20 questions)</li>
            <li>Cultural Competence (17 questions)</li>
            <li>Developmental Theory & Lifespan (16 questions)</li>
            <li>Assessment Scales & Screening (23 questions)</li>
            <li>Psychotherapy & Treatment (19 questions)</li>
            <li>Professional Practice (12 questions)</li>
            <li>Neuroscience & Pathophysiology (10 questions)</li>
            <li>Crisis & Emergency Management (12 questions)</li>
            <li>Plus 150+ additional specialized topics</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-2">Study Tips</h2>
          <ol className="list-decimal list-inside space-y-1 leading-relaxed">
            <li>Complete all questions at least twice before your exam</li>
            <li>Review rationales for both correct and incorrect answers</li>
            <li>Focus extra time on Pharmacology (largest content area)</li>
            <li>Track weak areas for targeted study</li>
            <li>Passing score on actual exam: 75% (131/175 questions)</li>
          </ol>
        </section>

        <section className="border-2 border-black p-4 bg-yellow-50">
          <p className="text-sm">
            <span className="font-bold">Disclaimer:</span> This practice platform is not officially endorsed by ANCC. Use as a supplemental study tool alongside official ANCC review materials.
          </p>
        </section>
      </div>
    </div>
  )
}
