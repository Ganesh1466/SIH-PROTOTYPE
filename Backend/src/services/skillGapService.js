import { SkillService } from './skillService.js';
import { initialJobs } from '../utils/seedData.js';

export class SkillGapService {
  /**
   * Analyzes skill gaps for a student against a target role or a specific job.
   */
  static analyzeSkillGap(student, targetRole = "Frontend Developer") {
    const studentSkills = SkillService.normalizeSkillList(student.skills || []);

    // Find relevant benchmark jobs
    const relevantJobs = initialJobs.filter(j => 
      j.title.toLowerCase().includes(targetRole.toLowerCase()) ||
      targetRole.toLowerCase().includes(j.title.toLowerCase())
    );

    const benchmarkJobs = relevantJobs.length > 0 ? relevantJobs : initialJobs;

    // Aggregate required & preferred skills across target jobs
    const skillFrequency = {};
    const skillTypes = {};

    benchmarkJobs.forEach(job => {
      job.requiredSkills?.forEach(skill => {
        const norm = SkillService.normalizeSkill(skill);
        skillFrequency[norm] = (skillFrequency[norm] || 0) + 2; // heavier weight for required
        skillTypes[norm] = "Required";
      });
      job.preferredSkills?.forEach(skill => {
        const norm = SkillService.normalizeSkill(skill);
        skillFrequency[norm] = (skillFrequency[norm] || 0) + 1;
        if (!skillTypes[norm]) skillTypes[norm] = "Preferred";
      });
    });

    const studentSkillsSet = new Set(studentSkills.map(s => s.toLowerCase()));

    const acquiredSkills = [];
    const missingSkills = [];

    Object.keys(skillFrequency).forEach(skill => {
      const isAcquired = studentSkillsSet.has(skill.toLowerCase());
      const item = {
        name: skill,
        category: SkillService.getSkillCategory(skill),
        type: skillTypes[skill] || "Preferred",
        demandWeight: skillFrequency[skill],
        priority: skillFrequency[skill] >= 4 ? "High" : skillFrequency[skill] >= 2 ? "Medium" : "Low"
      };

      if (isAcquired) {
        acquiredSkills.push(item);
      } else {
        missingSkills.push(item);
      }
    });

    // Sort missing skills by priority
    missingSkills.sort((a, b) => b.demandWeight - a.demandWeight);

    // Calculate current readiness and projected improvement
    const totalBenchmarkSkills = Object.keys(skillFrequency).length;
    const currentReadiness = totalBenchmarkSkills > 0 
      ? Math.round((acquiredSkills.length / totalBenchmarkSkills) * 100)
      : student.careerReadiness || 75;

    const potentialImprovement = Math.min(96, currentReadiness + Math.min(25, missingSkills.length * 7));

    // Generate rule-based week-by-week learning roadmap
    const roadmap = this.generateRoadmap(missingSkills.slice(0, 4), targetRole);

    return {
      targetRole,
      currentReadiness,
      potentialImprovement,
      acquiredSkills,
      missingSkills,
      prioritizedGaps: missingSkills.slice(0, 3),
      roadmap,
      disclaimer: "Estimated improvement based on current Rajasthan technical employer hiring requirements. Does not guarantee direct employment."
    };
  }

  static generateRoadmap(missingSkills, targetRole) {
    if (!missingSkills || missingSkills.length === 0) {
      return [
        {
          week: 1,
          topic: "Advanced System Design & Architecture",
          skill: "Architecture",
          estimatedHours: "10 hrs",
          learningOutcomes: "Learn state normalization, micro-frontends, and enterprise scaling patterns.",
          resources: [
            { title: "Rajasthan iStart Masterclass", type: "Video & Lab", link: "#" },
            { title: "MDN Web Architecture", type: "Documentation", link: "#" }
          ]
        }
      ];
    }

    const weeklyCurriculum = [
      {
        week: 1,
        skill: missingSkills[0]?.name || "TypeScript",
        topic: `${missingSkills[0]?.name || "TypeScript"} Core Fundamentals & Types`,
        estimatedHours: "8 hrs",
        learningOutcomes: `Master ${missingSkills[0]?.name || "TypeScript"} syntax, interfaces, generics, and compiler configurations.`,
        resources: [
          { title: `${missingSkills[0]?.name} Handbook`, type: "Interactive Guide", link: "#" },
          { title: "State Skill Portal Video Module", type: "Course", link: "#" }
        ]
      },
      {
        week: 2,
        skill: missingSkills[1]?.name || "Git Workflow & Testing",
        topic: `${missingSkills[1]?.name || "Git"} Deep-Dive & Branching Strategies`,
        estimatedHours: "10 hrs",
        learningOutcomes: "Learn CI/CD actions, rebasing, pull request workflows, and collaborative repo governance.",
        resources: [
          { title: "Git Pro Edition", type: "E-Book", link: "#" },
          { title: "Interactive Sandbox", type: "Hands-on Lab", link: "#" }
        ]
      },
      {
        week: 3,
        skill: missingSkills[2]?.name || "Automated Unit Testing",
        topic: `${missingSkills[2]?.name || "Testing with Jest"} & Test-Driven Development`,
        estimatedHours: "12 hrs",
        learningOutcomes: "Write robust unit tests, component mocks, and integration test suites.",
        resources: [
          { title: "Testing Modern Web Apps", type: "Tutorial", link: "#" },
          { title: "Rajasthan Youth Skill Series", type: "Live Workshop", link: "#" }
        ]
      },
      {
        week: 4,
        topic: `Capstone Project Integration for ${targetRole}`,
        skill: "Full Portfolio Project",
        estimatedHours: "15 hrs",
        learningOutcomes: `Integrate ${missingSkills.map(s => s.name).join(', ')} into a production-ready GitHub repository.`,
        resources: [
          { title: "Project Specification Brief", type: "Guided Project", link: "#" }
        ]
      }
    ];

    return weeklyCurriculum.slice(0, Math.max(2, missingSkills.length + 1));
  }
}
