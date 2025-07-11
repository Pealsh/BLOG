import { Helmet } from 'react-helmet-async';
import { Github, Mail, MapPin, Calendar, Star, GitFork, Code, BookOpen, Award } from 'lucide-react';

const Profile = () => {
  const stats = [
    { label: 'Projects', value: '0+', icon: Code },
    { label: 'Articles', value: '0+', icon: BookOpen },
    { label: 'Stars', value: '0+', icon: Star },
    { label: 'Contributions', value: '0+', icon: GitFork },
  ];

  const projects = [
    {
      name: 'Blog Portfolio',
      description: 'Personal blog and portfolio site built with React and TypeScript',
      tech: ['React', 'TypeScript', 'Tailwind CSS'],
      link: '#',
      stars: 45,
    },
  ];

  const achievements = [
    {
      title: 'Open Source Contributor',
      description: 'Active contributor to various open source projects',
      date: '2023',
      icon: GitFork,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Profile - Maoto Mikami</title>
        <meta name="description" content="Professional profile of Maoto Mikami - Developer, Student" />
      </Helmet>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="card p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
              <img 
                src="/img/ore.jpg" 
                alt="Maoto Mikami" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to gradient with initials if image fails to load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.className = 'w-32 h-32 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-white font-poppins font-bold text-3xl">MM</span>';
                }}
              />
            </div>
            
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-3xl font-poppins font-bold mb-2">Maoto Mikami</h1>
              <p className="text-xl text-muted-foreground mb-4">Developer | Student</p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-4">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Tokyo, Japan</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Joined 2020</span>
                </div>
              </div>
              
              <div className="flex justify-center lg:justify-start space-x-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="mailto:pengutobitai@gmail.com"
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="card p-6 text-center">
              <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary-500" />
              <div className="text-2xl font-poppins font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured Projects */}
          <div className="card p-6">
            <h2 className="text-2xl font-poppins font-semibold mb-6 flex items-center">
              <Code className="w-6 h-6 mr-2 text-primary-500" />
              Featured Projects
            </h2>
            
            <div className="space-y-6">
              {projects.map((project) => (
                <div key={project.name} className="border-l-4 border-primary-500 pl-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-poppins font-semibold">{project.name}</h3>
                    <div className="flex items-center text-muted-foreground">
                      <Star className="w-4 h-4 mr-1" />
                      <span className="text-sm">{project.stars}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech}
                        className="px-2 py-1 bg-muted text-muted-foreground rounded text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="card p-6">
            <h2 className="text-2xl font-poppins font-semibold mb-6 flex items-center">
              <Award className="w-6 h-6 mr-2 text-primary-500" />
              Achievements
            </h2>
            
            <div className="space-y-6">
              {achievements.map((achievement) => (
                <div key={achievement.title} className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary-500/10 rounded-full flex items-center justify-center">
                    <achievement.icon className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-semibold">{achievement.title}</h3>
                    <p className="text-muted-foreground mb-1">{achievement.description}</p>
                    <p className="text-sm text-muted-foreground">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;