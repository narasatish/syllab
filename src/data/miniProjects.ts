// Mini projects for Skills Lab - guided step-by-step projects
// Combines all skill areas: Python, JavaScript, HTML/CSS, SQL, AI, Data Analytics, Java, and 8 new subject areas

import { miniProjectsCore, type MiniProject } from './miniProjectsCore';
import { miniProjectsExtra } from './miniProjectsExtra';
import { miniProjectsHTML } from './miniProjectsHTML';
import { miniProjectsSQL } from './miniProjectsSQL';
import { miniProjectsAI } from './miniProjectsAI';
import { miniProjectsNew } from './miniProjectsNew';

export type { MiniProject };

export const miniProjects: MiniProject[] = [
  ...miniProjectsCore,
  ...miniProjectsHTML,
  ...miniProjectsExtra,
  ...miniProjectsSQL,
  ...miniProjectsAI,
  ...miniProjectsNew,
];
