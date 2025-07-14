import { Helmet } from 'react-helmet-async';
import { Github, Mail, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { translations } from '../../utils/translations';

const About = () => {
  const { language } = useLanguage();
  const t = translations[language];
  
  
  return (
    <>
      <Helmet>
        <title>{t.about} - Maoto Mikami</title>
        <meta name="description" content={t.aboutDesc} />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-poppins font-bold mb-4 text-gradient">
            {t.about}
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                {t.aboutIntro}
              </p>

              <h2 className="text-2xl font-poppins font-semibold mb-4">{t.myJourney}</h2>
              <p className="text-muted-foreground mb-6">
                {t.aboutJourneyText}
              </p>

              <h2 className="text-2xl font-poppins font-semibold mb-4">{t.whatIDo}</h2>
              <ul className="space-y-2 text-muted-foreground mb-6">
                {t.whatIDoList.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>

              <h2 className="text-2xl font-poppins font-semibold mb-4">{t.techILove}</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {['React', 'TypeScript', 'Node.js', 'Python', 'Next.js'].map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1 bg-primary-500/10 text-primary-500 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden bg-gray-200">
                  <img 
                    src="/img/ore.jpg" 
                    alt="Maoto Mikami" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to gradient with initials if image fails to load
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.className = 'w-32 h-32 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center';
                      e.currentTarget.parentElement!.innerHTML = '<span class="text-white font-poppins font-bold text-2xl">MM</span>';
                    }}
                  />
                </div>
                <h3 className="text-xl font-poppins font-semibold mb-2">Maoto Mikami</h3>
                <p className="text-muted-foreground">{t.developer} | {t.student}</p>
              </div>

              <div className="space-y-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 hover:bg-muted rounded-lg transition-colors"
                >
                  <Github className="w-5 h-5 text-muted-foreground" />
                  <span>GitHub</span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground ml-auto" />
                </a>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=pengutobitai@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 hover:bg-muted rounded-lg transition-colors"
                >
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <span>Email</span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground ml-auto" />
                </a>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary-500">0+</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">{t.experience}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary-500">4+</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">{t.skills}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary-500">∞</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">{t.interests}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;