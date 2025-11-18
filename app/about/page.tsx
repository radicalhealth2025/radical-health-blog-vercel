import { Metadata } from 'next';
import { Card } from '@/components/ui/Card';
import { generateAboutMetadata } from '@/lib/seo';

export const metadata: Metadata = generateAboutMetadata();

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-text mb-6">
            Our Mission
          </h1>
          <p className="text-xl md:text-2xl text-text-light font-body leading-relaxed">
            Guiding you toward lasting transformation through understanding, 
            compassion, and radical healing.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-12 p-8 md:p-12">
          <h2 className="text-3xl font-heading font-bold text-text mb-6">
            Why Radical Healing?
          </h2>
          <div className="space-y-4 text-text-light font-body text-lg leading-relaxed">
            <p>
              We believe that true healing goes beyond treating symptoms. It requires 
              exploring the root causes of suffering—the patterns, beliefs, and 
              experiences that shape our lives and keep us stuck in cycles of pain.
            </p>
            <p>
              Radical Healing is about transformation at the deepest level. It's about 
              developing awareness, cultivating compassion, and discovering the courage 
              to face what we've been avoiding. It's a journey from suffering to freedom, 
              from disconnection to wholeness.
            </p>
            <p>
              Through this platform, we share curated content, practices, and wisdom 
              from various healing traditions to support you on your unique journey. 
              Whether you're just beginning to explore healing or you're deep in the 
              process, you'll find resources here to guide and inspire you.
            </p>
          </div>
        </Card>

        {/* Values Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="p-6">
            <div className="text-4xl mb-4">🌱</div>
            <h3 className="text-2xl font-heading font-bold text-text mb-3">
              Growth & Transformation
            </h3>
            <p className="text-text-light font-body">
              We believe in the human capacity for growth and change. No matter 
              where you are in your journey, transformation is always possible.
            </p>
          </Card>

          <Card className="p-6">
            <div className="text-4xl mb-4">💝</div>
            <h3 className="text-2xl font-heading font-bold text-text mb-3">
              Compassion & Understanding
            </h3>
            <p className="text-text-light font-body">
              Healing requires self-compassion and understanding. We approach 
              suffering with gentleness, recognizing that pain is part of the 
              human experience.
            </p>
          </Card>

          <Card className="p-6">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-2xl font-heading font-bold text-text mb-3">
              Root Cause Exploration
            </h3>
            <p className="text-text-light font-body">
              True healing addresses the underlying causes of suffering, not just 
              the surface symptoms. We encourage deep inquiry and self-reflection.
            </p>
          </Card>

          <Card className="p-6">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-2xl font-heading font-bold text-text mb-3">
              Community & Connection
            </h3>
            <p className="text-text-light font-body">
              Healing happens in relationship. We foster a supportive community 
              where people can share their experiences and learn from each other.
            </p>
          </Card>
        </div>

        {/* Approach Section */}
        <Card className="mb-12 p-8 md:p-12 bg-primary/5">
          <h2 className="text-3xl font-heading font-bold text-text mb-6">
            Our Approach to Healing
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-heading font-semibold text-text mb-2">
                Integrative & Holistic
              </h3>
              <p className="text-text-light font-body">
                We draw from multiple healing traditions—psychology, mindfulness, 
                somatic practices, and spiritual wisdom—to offer a comprehensive 
                approach to transformation.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-heading font-semibold text-text mb-2">
                Evidence-Informed & Experiential
              </h3>
              <p className="text-text-light font-body">
                Our content is grounded in both research and lived experience. We 
                value scientific understanding while honoring the wisdom that comes 
                from direct experience.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-heading font-semibold text-text mb-2">
                Accessible & Practical
              </h3>
              <p className="text-text-light font-body">
                Healing shouldn't be complicated or exclusive. We strive to make 
                transformative practices and insights accessible to everyone, with 
                practical guidance you can apply in daily life.
              </p>
            </div>
          </div>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-text mb-4">
            Join Us on the Journey
          </h2>
          <p className="text-lg text-text-light font-body mb-8 max-w-2xl mx-auto">
            Whether you're seeking relief from suffering, looking to deepen your 
            healing practice, or simply curious about transformation, we invite you 
            to explore our resources and connect with our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/blog"
              className="inline-flex items-center justify-center px-6 py-3 text-lg font-heading font-medium rounded-lg bg-primary text-white hover:bg-primary-dark transition-all duration-200"
            >
              Read Our Blog
            </a>
            <a
              href="/feedback"
              className="inline-flex items-center justify-center px-6 py-3 text-lg font-heading font-medium rounded-lg bg-secondary text-white hover:bg-secondary-dark transition-all duration-200"
            >
              Share Your Story
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
