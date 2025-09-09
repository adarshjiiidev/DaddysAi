import Link from 'next/link';

export const metadata = {
  title: "Careers | Daddy's AI",
  description: "Join our team at Daddy's AI and help build the future of AI-powered financial intelligence for the Indian stock market."
};

export default function CareersPage() {
  const openPositions = [
    {
      title: "Senior Machine Learning Engineer",
      department: "Engineering",
      location: "Bangalore, India (Remote Possible)",
      type: "Full-time",
      description: "We're looking for an experienced ML engineer to help develop and improve our financial prediction models. You'll work with large financial datasets and implement cutting-edge algorithms.",
      requirements: [
        "5+ years of experience in machine learning and data science",
        "Strong background in Python, TensorFlow, and PyTorch",
        "Experience with time series forecasting and NLP",
        "Knowledge of financial markets is a plus",
        "MS or PhD in Computer Science, Statistics, or related field"
      ]
    },
    {
      title: "Full Stack Developer",
      department: "Engineering",
      location: "Bangalore, India (Remote Possible)",
      type: "Full-time",
      description: "Join our engineering team to build and maintain our web platform. You'll work on both frontend and backend components, ensuring a seamless user experience.",
      requirements: [
        "3+ years of experience in full stack development",
        "Proficiency in React, Next.js, and TypeScript",
        "Experience with Node.js and RESTful APIs",
        "Knowledge of database systems (MongoDB, PostgreSQL)",
        "Understanding of cloud services (AWS, Azure, or GCP)"
      ]
    },
    {
      title: "Financial Analyst",
      department: "Research",
      location: "Mumbai, India",
      type: "Full-time",
      description: "Help us improve our financial models by providing domain expertise. You'll work closely with our data science team to develop and validate investment strategies.",
      requirements: [
        "3+ years of experience in equity research or quantitative analysis",
        "Strong understanding of Indian financial markets",
        "CFA or MBA in Finance preferred",
        "Experience with financial data analysis tools",
        "Excellent analytical and problem-solving skills"
      ]
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Bangalore, India",
      type: "Full-time",
      description: "Lead the development of new features and products. You'll work with engineering, design, and business teams to define product requirements and roadmaps.",
      requirements: [
        "3+ years of experience in product management",
        "Experience with financial or SaaS products",
        "Strong understanding of user-centered design principles",
        "Excellent communication and stakeholder management skills",
        "MBA or equivalent experience preferred"
      ]
    },
  ];

  return (
    <div className="bg-[#050714] min-h-screen">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="mb-8">
          <Link href="/" className="text-orange-500 hover:text-orange-600 transition-colors">
            ← Back to Home
          </Link>
        </div>
        
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent mb-6">
            Join Our Team
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Help us build the future of AI-powered financial intelligence
          </p>
        </div>
        
        {/* Why Join Us */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold mb-10 text-center">Why Join Daddy's AI?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Meaningful Impact",
                description: "Your work will directly help thousands of investors make better financial decisions."
              },
              {
                title: "Cutting-Edge Technology",
                description: "Work with the latest AI and machine learning technologies applied to financial markets."
              },
              {
                title: "Growth Opportunities",
                description: "We're growing rapidly, creating abundant opportunities for career advancement."
              },
              {
                title: "Competitive Compensation",
                description: "We offer competitive salaries, equity options, and comprehensive benefits."
              },
              {
                title: "Flexible Work Environment",
                description: "We support remote work and flexible schedules to help you maintain work-life balance."
              },
              {
                title: "Collaborative Culture",
                description: "Join a team of passionate individuals who value collaboration, innovation, and continuous learning."
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-gradient-to-br from-[#0a0d1a] to-[#111827] p-6 rounded-xl border border-orange-500/20">
                <h3 className="text-xl font-semibold mb-4 text-white">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Open Positions */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold mb-10 text-center">Open Positions</h2>
          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <div key={index} className="bg-gradient-to-br from-[#0a0d1a] to-[#111827] p-6 md:p-8 rounded-xl border border-orange-500/20">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-white">{position.title}</h3>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <span className="text-sm bg-orange-500/10 text-orange-500 px-3 py-1 rounded-full">{position.department}</span>
                      <span className="text-sm bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full">{position.location}</span>
                      <span className="text-sm bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full">{position.type}</span>
                    </div>
                  </div>
                  <button className="mt-4 md:mt-0 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 whitespace-nowrap">
                    Apply Now
                  </button>
                </div>
                
                <p className="text-gray-300 mb-6">{position.description}</p>
                
                <div>
                  <h4 className="text-lg font-medium text-white mb-3">Requirements:</h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-400">
                    {position.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Our Hiring Process */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold mb-10 text-center">Our Hiring Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Application Review",
                description: "We review your resume and cover letter to assess your qualifications and fit."
              },
              {
                step: "2",
                title: "Initial Interview",
                description: "A 30-minute video call with our HR team to discuss your background and expectations."
              },
              {
                step: "3",
                title: "Technical Assessment",
                description: "Depending on the role, you may complete a take-home assignment or technical interview."
              },
              {
                step: "4",
                title: "Final Interviews",
                description: "Meet with team members and leadership to discuss your experience and our company culture."
              }
            ].map((step, index) => (
              <div key={index} className="bg-gradient-to-br from-[#0a0d1a] to-[#111827] p-6 rounded-xl border border-orange-500/20 relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 flex items-center justify-center text-white font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white mt-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* No Open Positions? */}
        <div className="bg-gradient-to-br from-[#0a0d1a] to-[#111827] p-8 md:p-12 rounded-2xl border border-orange-500/20 text-center mb-20">
          <h2 className="text-3xl font-bold mb-6">Don't See a Suitable Position?</h2>
          <p className="text-gray-300 max-w-3xl mx-auto mb-8">
            We're always looking for talented individuals to join our team. Send us your resume and tell us how you can contribute to Daddy's AI.
          </p>
          <Link href="/contact" className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 inline-block">
            Contact Us
          </Link>
        </div>
        
        {/* Testimonials */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold mb-10 text-center">What Our Team Says</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: "Working at Daddy's AI has been an incredible journey. I've grown so much professionally while working on challenging problems that make a real difference for our users.",
                name: "Vikram Singh",
                role: "Senior Data Scientist",
                joined: "Joined 2023"
              },
              {
                quote: "The culture here is unlike any company I've worked for. There's a perfect balance of autonomy and collaboration, and everyone is passionate about our mission.",
                name: "Ananya Desai",
                role: "Product Designer",
                joined: "Joined 2023"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-[#0a0d1a] to-[#111827] p-6 md:p-8 rounded-xl border border-orange-500/20 relative">
                <div className="absolute top-6 left-6 text-5xl text-orange-500/20">"</div>
                <p className="text-gray-300 italic relative z-10 mb-6">{testimonial.quote}</p>
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-orange-500">{testimonial.role}</p>
                  <p className="text-sm text-gray-500">{testimonial.joined}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}