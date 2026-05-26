import type { TutorialTopic } from './types';

export const gitGithubTopics: TutorialTopic[] = [
  // ============ Git Basics (10 topics) ============

  {
    id: 'git-intro',
    category: 'Git Basics',
    title: 'What is Git?',
    difficulty: 'Beginner',
    theory: [
      'Git is a version control system that tracks changes to your code over time. Imagine you\'re writing a story and want to keep every draft you ever made — Git lets you do that with code. It records WHO changed WHAT, WHEN, and WHY. This is essential for teamwork!',
      'Think of Git like a time machine for your project. If you make a mistake, you can go back to an earlier version. Multiple developers can work on the same project without accidentally overwriting each other\'s work. Git is used by companies like Google, Microsoft, ISRO (Indian Space Research Organisation), and thousands of Indian startups.',
      'Priya and Arjun are building a school project website together. Without Git, they\'d have to manually manage versions like "website_v1.zip", "website_v2.zip", etc. With Git, they track every change and collaborate seamlessly.'
    ],
    code: `# Git is already on your computer (after installation)
# Let's verify it's working
git --version

# Output: git version 2.46.0 (or your version)`,
    output: 'git version 2.46.0',
    notes: [
      'Git is "distributed" — everyone has a full copy of the project history',
      'GitHub is a cloud platform FOR Git — it\'s not the same as Git itself',
      'Git is free and open-source, created by Linus Torvalds (creator of Linux)'
    ],
    practice: {
      title: 'Install & Verify Git',
      description: 'Check if Git is installed on your computer. If not, install it from git-scm.com.',
      hint: 'Open Terminal/Command Prompt and run `git --version`',
      solution: 'If you see a version number, Git is installed! If not, download and install from https://git-scm.com'
    }
  },

  {
    id: 'installing-git',
    category: 'Git Basics',
    title: 'Installing Git & Configuration',
    difficulty: 'Beginner',
    theory: [
      'Before using Git, you need to install it and configure your identity. Git will ask "Who made this change?" — you need to tell it your name and email so every commit is credited to you.',
      'Configuration happens in two ways: globally (applies to all projects on your computer) or per-project (only for one folder). We\'ll use global configuration so we don\'t have to repeat it every time.',
      'After installation, Priya needs to configure Git so that when she commits code, it says "Priya made this change on 2026-01-15" instead of "Unknown user".'
    ],
    syntax: `git config --global user.name "Your Name"
git config --global user.email "your@email.com"`,
    code: `# Step 1: Configure your name (global)
git config --global user.name "Priya Sharma"

# Step 2: Configure your email (global)
git config --global user.email "priya@example.com"

# Step 3: Verify configuration
git config --global --list

# Output includes:
# user.name=Priya Sharma
# user.email=priya@example.com`,
    output: `user.name=Priya Sharma
user.email=priya@example.com
...other configs...`,
    notes: [
      'Use your real name — this appears in commit history',
      'Email doesn\'t have to be public on GitHub; you can use a GitHub-provided email',
      'Check per-project config with `git config --list` (without --global)'
    ],
    practice: {
      title: 'Configure Your Git Identity',
      description: 'Set up your global Git configuration so commits are credited to you.',
      hint: 'Use your real name and email (can be private). Run `git config --global user.name "..."` and `git config --global user.email "..."`',
      solution: `git config --global user.name "Your Name"
git config --global user.email "your@email.com"
git config --global --list  # verify`
    }
  },

  {
    id: 'git-init',
    category: 'Git Basics',
    title: 'git init - Start a Git Repository',
    difficulty: 'Beginner',
    theory: [
      '`git init` creates a hidden `.git` folder in your project directory. This folder stores all the history, branches, and configuration. It\'s the "brain" of your project\'s version control.',
      'You only run `git init` once per project. It transforms a regular folder into a Git repository. After this, Git starts tracking changes in that folder.',
      'When Priya creates a new folder for the school project, she runs `git init` to tell Git "Hey, track this folder from now on!"'
    ],
    syntax: `git init`,
    code: `# Create a new project folder
mkdir school-project
cd school-project

# Initialize Git
git init

# Output:
# Initialized empty Git repository in /home/priya/school-project/.git/

# Verify (list hidden files)
ls -la

# You'll see a .git folder now`,
    output: 'Initialized empty Git repository in /home/priya/school-project/.git/',
    notes: [
      'The `.git` folder is hidden by default (prefix dot means hidden on Linux/Mac)',
      'Never manually edit files inside `.git` — let Git manage it',
      'After `git init`, the folder is a repository and ready for version control'
    ],
    practice: {
      title: 'Initialize a Git Repository',
      description: 'Create a folder for a test project and initialize Git in it.',
      hint: 'mkdir test-project && cd test-project && git init',
      solution: `mkdir test-project
cd test-project
git init
# Check with: ls -la (or dir on Windows)`
    }
  },

  {
    id: 'git-status',
    category: 'Git Basics',
    title: 'git status - Check Repository Status',
    difficulty: 'Beginner',
    theory: [
      '`git status` shows what\'s happening in your repository right now. It tells you which files are new, which are modified, and which are ready to commit. Think of it as a "dashboard" for your project.',
      'Git categories files into: untracked (Git doesn\'t know about it yet), modified (changed but not staged), and staged (ready to commit). `git status` shows all three categories.',
      'Arjun wants to check what he and Priya have changed before committing. He runs `git status` to see the current state.'
    ],
    syntax: `git status`,
    code: `# Create some files
echo "# School Project" > README.md
echo "const greeting = 'Hello';" > app.js

# Check status
git status

# Output:
# On branch main
# No commits yet
# Untracked files:
#   (use "git add <file>..." to include in what will be committed)
#         README.md
#         app.js`,
    output: `On branch main
No commits yet
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        README.md
        app.js

nothing added to commit but untracked files present`,
    notes: [
      'Run `git status` frequently — it guides you on what to do next',
      'Red means untracked/modified; Green means staged and ready to commit',
      'Use `git status -s` for short output (useful in scripts)'
    ],
    practice: {
      title: 'Check Repository Status',
      description: 'Create a few files in your test repo and check the status.',
      hint: 'Create files using `echo "content" > filename.txt`, then run `git status`',
      solution: `echo "Hello" > hello.txt
git status
# You should see "hello.txt" as untracked`
    }
  },

  {
    id: 'git-add',
    category: 'Git Basics',
    title: 'git add - Stage Changes',
    difficulty: 'Beginner',
    theory: [
      '`git add` stages files — it tells Git "I want to include these changes in my next commit." Staging is the step between making changes and committing them. It\'s like putting items in a shopping cart before checkout.',
      'You can stage files one by one (`git add file.txt`) or all at once (`git add .`). Staging lets you be selective about what you commit — maybe you changed file1.txt and file2.txt, but only want to commit file1.txt right now.',
      'Priya creates a README.md file and stages it. Later, Arjun modifies the CSS file and stages that too. They control what goes into each commit.'
    ],
    syntax: `git add <file>          # Stage one file
git add .              # Stage all changes
git add *.js           # Stage all .js files`,
    code: `# Create files
echo "# School Project Website" > README.md
echo "body { color: blue; }" > style.css

# Check status (both files untracked)
git status

# Stage README.md
git add README.md

# Check status again
git status

# Output shows:
# Changes to be committed:
#   new file:   README.md
#
# Untracked files:
#   style.css`,
    output: `Changes to be committed:
  new file:   README.md

Untracked files:
  style.css`,
    notes: [
      'Staging is a crucial step — it separates changes you want to commit from work-in-progress',
      'Use `git add -p` to stage parts of a file interactively',
      'Use `git reset <file>` to unstage a file'
    ],
    practice: {
      title: 'Stage Files',
      description: 'Create a few files, then stage one of them.',
      hint: 'echo "content" > file.txt && git add file.txt && git status',
      solution: `echo "Main content" > index.html
echo "Styles" > main.css
git add index.html
git status
# You should see index.html staged (green) and main.css untracked (red)`
    }
  },

  {
    id: 'git-commit',
    category: 'Git Basics',
    title: 'git commit - Save Changes with a Message',
    difficulty: 'Beginner',
    theory: [
      '`git commit` saves your staged changes to Git history with a message. This message explains WHY you made the change, not just WHAT changed. "Add homepage" is better than "update files".',
      'Each commit is like a snapshot of your project at that moment. You can always go back to any commit. Good commit messages help you (and teammates) understand the project\'s evolution.',
      'When Priya and Arjun commit their work, they write clear messages like "Add navigation menu" or "Fix login button alignment". This makes it easy to understand the project history months later.'
    ],
    syntax: `git commit -m "Your message here"`,
    code: `# Stage files first
git add README.md app.js

# Commit with a message
git commit -m "Initial project setup with README and app structure"

# Output:
# [main (root-commit) a1b2c3d] Initial project setup with README and app structure
#  2 files changed, 15 insertions(+)
#  create mode 100644 README.md
#  create mode 100644 app.js`,
    output: `[main (root-commit) a1b2c3d] Initial project setup with README and app structure
 2 files changed, 15 insertions(+)
 create mode 100644 README.md
 create mode 100644 app.js`,
    notes: [
      'Write meaningful messages: "Fix bug in login" instead of "bug fix"',
      'Use present tense: "Add feature" not "Added feature"',
      'Keep messages under 50 characters for the first line'
    ],
    practice: {
      title: 'Commit Your Changes',
      description: 'Stage a file and commit it with a meaningful message.',
      hint: 'git add <file> && git commit -m "Your descriptive message"',
      solution: `git add index.html
git commit -m "Create homepage layout"
# You should see commit confirmation with a hash like a1b2c3d`
    }
  },

  {
    id: 'git-log',
    category: 'Git Basics',
    title: 'git log - View Commit History',
    difficulty: 'Beginner',
    theory: [
      '`git log` shows all commits in reverse chronological order (newest first). Each commit shows the author, date, message, and a unique hash (like a1b2c3d). This is the "diary" of your project.',
      'The commit hash is important — it uniquely identifies every change. You can use it to reference a specific point in history or revert to that version.',
      'When Arjun wants to understand what changes were made to the project, he runs `git log` to see the entire history of commits from Priya and himself.'
    ],
    syntax: `git log                           # Full log
git log --oneline                 # One line per commit
git log -n 5                       # Last 5 commits
git log --author="Priya"           # Commits by one author`,
    code: `# View commit history
git log

# Output:
# commit a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
# Author: Priya Sharma <priya@example.com>
# Date:   Mon Jan 15 10:30:45 2024 +0530
#
#     Initial project setup with README and app structure
#
# commit abc123def456ghi789jkl012mno345pqr
# Author: Arjun Singh <arjun@example.com>
# Date:   Mon Jan 15 11:20:15 2024 +0530
#
#     Add navigation menu

# Or shorter version:
git log --oneline

# Output:
# a1b2c3d Initial project setup
# abc123d Add navigation menu`,
    output: `commit a1b2c3d (HEAD -> main)
Author: Priya Sharma <priya@example.com>
Date:   Mon Jan 15 10:30:45 2024 +0530

    Initial project setup with README and app structure`,
    notes: [
      'Press Q to exit log view (on Unix/Mac)',
      'Use `git log --graph --oneline --all` for a visual branch diagram',
      'Each commit is permanent in Git history (unless you force delete)'
    ],
    practice: {
      title: 'View Your Commit History',
      description: 'Make 2-3 commits and view the log to see your project history.',
      hint: 'git commit -m "message1" && git commit -m "message2" && git log --oneline',
      solution: `# After making commits:
git log --oneline
# You should see your commits listed with hashes and messages`
    }
  },

  {
    id: 'git-diff',
    category: 'Git Basics',
    title: 'git diff - Compare Changes',
    difficulty: 'Beginner',
    theory: [
      '`git diff` shows line-by-line what changed between versions. It displays removed lines (with -) and added lines (with +). This is useful before committing to make sure you\'re committing the right changes.',
      'You can compare your current work to the last commit, or any two commits. It\'s like a detailed "before and after" view.',
      'Priya modifies the README to add instructions. Before committing, she runs `git diff` to review exactly what she changed and make sure there are no accidental edits.'
    ],
    syntax: `git diff                    # Changes not staged
git diff --staged            # Changes staged
git diff <commit1> <commit2> # Between commits`,
    code: `# Edit a file
echo "Original line" > README.md
git add README.md
git commit -m "First version"

# Now modify it
echo "Updated line" > README.md

# See what changed
git diff

# Output:
# diff --git a/README.md b/README.md
# index abc123..def456 100644
# --- a/README.md
# +++ b/README.md
# @@ -1 +1 @@
# -Original line
# +Updated line`,
    output: `diff --git a/README.md b/README.md
index abc123..def456 100644
--- a/README.md
+++ b/README.md
@@ -1 +1 @@
-Original line
+Updated line`,
    notes: [
      'Red (- lines) = deleted content; Green (+ lines) = added content',
      'Use `git diff HEAD` to compare working directory to last commit',
      'Use `git diff --stat` for a summary without line details'
    ],
    practice: {
      title: 'Compare Changes with git diff',
      description: 'Modify a committed file and use git diff to see what changed.',
      hint: 'Edit a file you already committed, then run git diff',
      solution: `# After editing a file:
git diff
# You should see the removed and added lines highlighted`
    }
  },

  {
    id: 'gitignore',
    category: 'Git Basics',
    title: '.gitignore - Exclude Files from Tracking',
    difficulty: 'Beginner',
    theory: [
      'Not all files should be in Git. Temporary files, API keys, passwords, and large binaries like node_modules/ should be excluded. You do this with a `.gitignore` file.',
      '.gitignore is a simple text file that lists patterns of files Git should ignore. If you accidentally commit a secret key, delete it from Git history before pushing to GitHub!',
      'Priya and Arjun create a `.gitignore` file to exclude node_modules/, .env (which has passwords), and macOS .DS_Store files. This keeps their repository clean and secure.'
    ],
    syntax: `# In .gitignore file:
node_modules/
.env
.DS_Store
*.log
build/`,
    code: `# Create .gitignore
cat > .gitignore << 'EOF'
node_modules/
.env
.env.local
dist/
*.log
.DS_Store
EOF

# Create a file that should be ignored
echo "DATABASE_PASSWORD=secret123" > .env

# Check status
git status

# Output:
# On branch main
# Untracked files:
#   .gitignore
#
# (notice .env is NOT listed — it's ignored)`,
    output: `On branch main
Untracked files:
  .gitignore

(notice .env is not listed because it's in .gitignore)`,
    notes: [
      'Create `.gitignore` at the project root',
      'Use patterns: `*.log` matches all .log files, `node_modules/` ignores a folder',
      'Always exclude `.env` files with secrets'
    ],
    practice: {
      title: 'Create a .gitignore File',
      description: 'Create a .gitignore file to exclude common unneeded files.',
      hint: 'Create .gitignore with node_modules/, .env, and *.log',
      solution: `cat > .gitignore << 'EOF'
node_modules/
.env
*.log
EOF
git add .gitignore && git commit -m "Add .gitignore"`
    }
  },

  {
    id: 'git-stash',
    category: 'Git Basics',
    title: 'git stash - Temporarily Save Work',
    difficulty: 'Intermediate',
    theory: [
      'Sometimes you start working on something, then need to switch to a different task without committing. `git stash` temporarily saves your changes in a safe place, letting you come back to them later.',
      'Stashing is like putting your work in a drawer. Your working directory becomes clean, but your changes aren\'t lost. You can retrieve them anytime with `git stash pop`.',
      'Priya is working on a new feature when Arjun asks her to fix an urgent bug. She stashes her feature work, fixes the bug, then pops her feature work back to continue where she left off.'
    ],
    syntax: `git stash                    # Save work
git stash pop                   # Restore latest stash
git stash list                  # List all stashes
git stash drop                  # Delete a stash`,
    code: `# Make changes (but don't commit)
echo "New feature code" > feature.js
git add feature.js

# Suddenly need to switch branches
git stash

# Working directory is clean now
git status
# Output: nothing to commit, working tree clean

# Fix the bug, make commits, etc.

# Come back to your feature work
git stash pop

# Your changes are restored!
git status
# Output: Changes to be committed: feature.js`,
    output: `Saved working directory and index state WIP on main: abc123 Last commit
Dropped refs/stash@{0} (a1b2c3d)`,
    notes: [
      'Use descriptive stash messages: `git stash save "WIP: feature name"`',
      '`git stash pop` retrieves and removes the stash; `git stash apply` retrieves but keeps it',
      'Useful for switching branches without committing incomplete work'
    ],
    practice: {
      title: 'Use git stash',
      description: 'Make changes, stash them, then pop them back.',
      hint: 'echo "temp" > file.txt && git add . && git stash && git stash pop',
      solution: `echo "work in progress" > feature.txt
git add feature.txt
git stash
# Check: git status (should be clean)
git stash pop
# Check: git status (feature.txt should be back)`
    }
  },

  // ============ Branching & Merging (8 topics) ============

  {
    id: 'git-branch',
    category: 'Branching & Merging',
    title: 'git branch - Create & Manage Branches',
    difficulty: 'Intermediate',
    theory: [
      'A branch is an independent line of development. The main branch (usually "main" or "master") is production-ready. Feature branches let you work on new features without affecting the main code. Git makes switching between branches instant and safe.',
      'Think of branches like parallel universes: you can change things in one branch without affecting another. When the feature is done and tested, you merge it back into main.',
      'Priya creates a "homepage" branch to work on the homepage design. Arjun creates a "login-feature" branch to build login functionality. They work independently, and their changes don\'t interfere.'
    ],
    syntax: `git branch                  # List local branches
git branch <branch-name>        # Create new branch
git branch -d <branch-name>     # Delete branch
git branch -a                   # List all (local + remote)`,
    code: `# List current branches
git branch
# Output:
# * main    (asterisk shows current branch)

# Create a new branch for the homepage feature
git branch homepage-feature

# List branches again
git branch
# Output:
# * main
#   homepage-feature

# Create another branch for login
git branch login-feature

# List again
git branch -a
# Output:
# * main
#   homepage-feature
#   login-feature`,
    output: `* main
  homepage-feature
  login-feature`,
    notes: [
      'Branch names should be descriptive: "fix-login-bug" is better than "test"',
      'The asterisk (*) shows your current branch',
      'Use hyphens for branch names, not spaces or underscores'
    ],
    practice: {
      title: 'Create Branches',
      description: 'Create 2-3 branches for different features.',
      hint: 'git branch feature-name && git branch -a',
      solution: `git branch dark-mode
git branch api-integration
git branch -a
# You should see all three branches listed`
    }
  },

  {
    id: 'git-checkout',
    category: 'Branching & Merging',
    title: 'git checkout - Switch Branches',
    difficulty: 'Intermediate',
    theory: [
      '`git checkout` switches your working directory to a different branch. When you switch, Git updates all files in your folder to match that branch\'s code. It\'s fast and safe because Git knows the history of each branch.',
      'Modern Git also supports `git switch` (newer command, same purpose). Both work, but we\'ll focus on `checkout` since it\'s more widely used.',
      'Arjun switches from main to the login-feature branch, makes changes specific to login, then switches back to main. The files in his folder change as he switches.'
    ],
    syntax: `git checkout <branch-name>              # Switch to existing branch
git checkout -b <branch-name>           # Create and switch (shorthand)`,
    code: `# Start on main branch
git branch
# Output: * main

# Create and switch to homepage-feature
git checkout -b homepage-feature

# Current branch changes
git branch
# Output: * homepage-feature
#         main

# Make changes in this branch
echo "<h1>Welcome to School Project</h1>" > index.html
git add index.html
git commit -m "Add homepage heading"

# Switch back to main
git checkout main

# Files revert to main's version!
# (index.html is no longer there, or has main's content)

# Switch back to homepage-feature
git checkout homepage-feature
# index.html is back with our changes!`,
    output: `Switched to branch 'homepage-feature'`,
    notes: [
      '`git checkout -b` creates a branch and switches in one command',
      'Always commit or stash before switching branches',
      'You can\'t switch branches if you have uncommitted changes in conflicting files'
    ],
    practice: {
      title: 'Switch Between Branches',
      description: 'Create a branch, switch to it, make a change, then switch back.',
      hint: 'git checkout -b feature && echo "content" > file.txt && git checkout main',
      solution: `git checkout -b my-feature
echo "Feature content" > feature.txt
git add feature.txt
git commit -m "Add feature file"
git checkout main
# Check: file won't exist here (or different version)
git checkout my-feature
# Check: file is back`
    }
  },

  {
    id: 'git-merge',
    category: 'Branching & Merging',
    title: 'git merge - Combine Branches',
    difficulty: 'Intermediate',
    theory: [
      '`git merge` integrates changes from one branch into another. Typically, you merge feature branches back into main after testing. Git automatically combines the changes if they don\'t conflict.',
      'There are two main merge strategies: fast-forward (simple linear history) and merge commit (preserves branch history with a merge commit). Git picks the best one automatically.',
      'When Priya finishes the homepage feature and tests it, she merges the homepage-feature branch back into main so everyone gets the new code.'
    ],
    syntax: `git merge <branch-name>         # Merge branch into current branch`,
    code: `# Work on homepage-feature
git checkout homepage-feature
echo "<h1>Welcome</h1>" > index.html
git add index.html
git commit -m "Complete homepage design"

# Switch to main
git checkout main

# Merge homepage-feature into main
git merge homepage-feature

# Output:
# Updating abc123..def456
# Fast-forward
#  index.html | 1 +
#  1 file changed, 1 insertion(+)

# Now main has the homepage changes!
git log --oneline
# Shows all commits including those from homepage-feature`,
    output: `Updating abc123..def456
Fast-forward
 index.html | 1 +
 1 file changed, 1 insertion(+)`,
    notes: [
      'Switch to the target branch (usually main) before merging',
      'Fast-forward merge is the simplest (linear history)',
      'Merge commits preserve branch history (useful for tracking feature work)'
    ],
    practice: {
      title: 'Merge a Branch',
      description: 'Create a feature branch, make changes, then merge it into main.',
      hint: 'Create branch → make commit → checkout main → git merge <branch>',
      solution: `git checkout -b feature-x
echo "Feature X content" > feature-x.txt
git add feature-x.txt
git commit -m "Add feature X"
git checkout main
git merge feature-x
# Check: git log should show the feature commit`
    }
  },

  {
    id: 'merge-conflicts',
    category: 'Branching & Merging',
    title: 'Handling Merge Conflicts',
    difficulty: 'Intermediate',
    theory: [
      'Merge conflicts happen when two people edit the same part of the same file differently. Git can\'t decide which version to keep, so it asks you to choose manually. This is normal in teamwork!',
      'Git marks conflicts with special markers: <<<<<<< (start of conflict), ======= (divider), >>>>>>> (end). You edit the file to remove these markers and keep the code you want.',
      'Priya and Arjun both edit the navigation menu in different ways. Git detects the conflict and asks them to manually fix it. They decide which changes to keep and resolve it together.'
    ],
    code: `# Scenario: Priya and Arjun edit the same file
# Priya's version in main: "Home | About | Contact"
# Arjun's version in nav-branch: "Home | Services | FAQ"

git merge nav-branch

# Output:
# CONFLICT (content): Merge conflict in navbar.html
# Automatic merge failed; fix conflicts and then commit the result.

# Open navbar.html - it now shows:
# <nav>
# <<<<<<< HEAD
#   <a href="/">Home</a>
#   <a href="/about">About</a>
#   <a href="/contact">Contact</a>
# =======
#   <a href="/">Home</a>
#   <a href="/services">Services</a>
#   <a href="/faq">FAQ</a>
# >>>>>>> nav-branch
# </nav>

# They decide to keep both sets of changes:
# <nav>
#   <a href="/">Home</a>
#   <a href="/about">About</a>
#   <a href="/contact">Contact</a>
#   <a href="/services">Services</a>
#   <a href="/faq">FAQ</a>
# </nav>

# Stage the resolved file
git add navbar.html

# Complete the merge
git commit -m "Merge nav-branch with all navigation links"`,
    output: `CONFLICT (content): Merge conflict in navbar.html
Automatic merge failed; fix conflicts and then commit the result.`,
    notes: [
      'Conflicts are marked with <<<<<<, =======, and >>>>>> in the file',
      'Remove the markers and the unwanted code, keeping what you need',
      'Use `git status` to see files with conflicts',
      'IDEs like VS Code highlight conflicts visually'
    ],
    practice: {
      title: 'Resolve a Merge Conflict',
      description: 'Create a conflict and resolve it manually.',
      hint: 'Edit same file in two branches differently, then merge and fix',
      solution: `git checkout -b branch-a
echo "Line A" > file.txt
git add . && git commit -m "Version A"
git checkout main
echo "Line B" > file.txt
git add . && git commit -m "Version B"
git merge branch-a
# Edit file.txt to resolve conflict
git add file.txt && git commit -m "Resolve conflict"`
    }
  },

  {
    id: 'fast-forward-merge',
    category: 'Branching & Merging',
    title: 'Understanding Fast-Forward Merge',
    difficulty: 'Intermediate',
    theory: [
      'A fast-forward merge happens when the main branch hasn\'t changed since you created your feature branch. Git simply moves the main pointer to your branch\'s latest commit — no merge commit needed. It\'s the simplest merge.',
      'In contrast, a "merge commit" (non-fast-forward) creates a new commit that explicitly shows a merge happened. This preserves the branch history.',
      'Priya works on a feature for 2 days. Meanwhile, Arjun doesn\'t commit anything to main. When Priya\'s done, Git does a fast-forward merge because main is "behind" the feature branch.'
    ],
    code: `# Fast-forward merge example
git checkout -b feature-1
echo "Feature code" > feature.js
git add feature.js
git commit -m "Add feature 1"

# main hasn't changed, so...
git checkout main
git merge feature-1

# Output: Fast-forward
# The main pointer just moves to feature-1's commit

# Result: Linear history (no merge commit)
git log --oneline
# abc123 Add feature 1
# def456 Previous commit

# Force a merge commit (even if fast-forward possible):
git merge --no-ff feature-2
# Output: Creates a merge commit explicitly`,
    output: `Updating abc123..def456
Fast-forward
 feature.js | 5 ++++++
 1 file changed, 5 insertions(+)`,
    notes: [
      'Fast-forward is clean and keeps history linear',
      'Use --no-ff to force a merge commit if you want branch history preserved',
      'Most teams prefer --no-ff for feature merges to see when work was integrated'
    ],
    practice: {
      title: 'Observe a Fast-Forward Merge',
      description: 'Create a branch with commits, then merge it (should be fast-forward).',
      hint: 'Create branch with commits, don\'t change main, then merge',
      solution: `git checkout -b feature
echo "code" > file.txt
git add . && git commit -m "Feature"
git checkout main
git merge feature
# Should see "Fast-forward" message`
    }
  },

  {
    id: 'git-rebase',
    category: 'Branching & Merging',
    title: 'git rebase - Rewrite Commit History',
    difficulty: 'Advanced',
    theory: [
      'Rebasing rewrites your branch\'s commit history on top of another branch. Instead of a merge commit, rebasing makes your commits appear as if they were made after the target branch\'s latest commit. It keeps history clean and linear.',
      'Rebasing is powerful but should be used carefully: never rebase commits that are already pushed publicly (others might be working from them). Use it for local cleanup before pushing.',
      'Priya has 3 commits on her feature branch. She rebases onto main to "replay" her commits on top of main\'s latest work. This avoids a merge commit and keeps the history clean.'
    ],
    syntax: `git rebase <branch-name>        # Rebase current branch onto another
git rebase -i HEAD~3            # Interactive rebase (edit 3 commits)`,
    code: `# Feature branch has commits X, Y, Z
git checkout feature-branch

# Rebase onto main (replays X, Y, Z on top of main)
git rebase main

# Output:
# Successfully rebased and updated refs/heads/feature-branch.

# Now your commits appear in sequence after main's commits
git log --oneline --graph
# Shows linear history without merge commit

# If conflicts occur during rebase:
# 1. Fix the conflicted files
# 2. git add <files>
# 3. git rebase --continue`,
    output: `Successfully rebased and updated refs/heads/feature-branch.`,
    notes: [
      'Never rebase public commits (already pushed to shared branch)',
      'Rebasing rewrites history — avoid in collaborative workflows without team agreement',
      'Use rebase for local branches before pushing; use merge for public collaboration',
      'Alternative: use `git merge --squash` to combine commits during merge'
    ],
    practice: {
      title: 'Practice Rebasing (Advanced)',
      description: 'Create a feature branch, then rebase it onto main.',
      hint: 'Create commits on feature, then `git rebase main`',
      solution: `git checkout -b feature
echo "commit1" > f1.txt && git add . && git commit -m "C1"
echo "commit2" > f2.txt && git add . && git commit -m "C2"
git checkout main
echo "main-commit" > m.txt && git add . && git commit -m "Main C"
git checkout feature
git rebase main
git log --oneline
# Should show Main C, then C1, C2 in linear order`
    }
  },

  {
    id: 'branch-strategies',
    category: 'Branching & Merging',
    title: 'Git Branch Strategies (Git Flow & Trunk-Based)',
    difficulty: 'Advanced',
    theory: [
      'Branch strategies are team conventions for organizing branches. Git Flow uses develop, release, and hotfix branches alongside main. Trunk-Based Development keeps most work on main with short-lived feature branches. Each suits different team sizes and release frequencies.',
      'Git Flow is ideal for scheduled releases; Trunk-Based is best for continuous deployment. Indian startups often use Trunk-Based for agility, while enterprises prefer Git Flow for stability.',
      'Priya and Arjun\'s school project is small, so they use a simple strategy: main + feature branches. A real product team would pick Git Flow or Trunk-Based based on their release cycle.'
    ],
    code: `# Git Flow example (simplified)
# Main workflow:
git checkout -b develop  # Create develop branch from main

# Feature development:
git checkout -b feature/login develop
# ... make changes ...
git merge feature/login develop

# Release preparation:
git checkout -b release/1.0 develop
# ... bug fixes only ...
git merge release/1.0 main
git tag v1.0

# Hotfix for production issue:
git checkout -b hotfix/critical main
# ... fix issue ...
git merge hotfix/critical main
git merge hotfix/critical develop`,
    output: `# Branch structure after Git Flow:
main       → v1.0 (stable releases)
develop    → integration branch
feature/*  → individual features
release/*  → release candidates
hotfix/*   → emergency fixes`,
    notes: [
      'Git Flow is formal; good for products with version releases',
      'Trunk-Based is simpler; good for continuous deployment (like modern web apps)',
      'Choose based on team size and release frequency',
      'Many Indian startups use Trunk-Based for speed'
    ],
    practice: {
      title: 'Learn Git Flow (Conceptual)',
      description: 'Understand Git Flow branching. You don\'t need to practice it; just know the concept.',
      hint: 'main (production) → develop (staging) → feature/* (work) → merge back',
      solution: 'Git Flow: main is production. develop is staging. Feature branches branch from develop, merge back into develop. When ready, release branches merge develop into main. Hotfixes go main → develop.'
    }
  },

  {
    id: 'git-cherry-pick',
    category: 'Branching & Merging',
    title: 'git cherry-pick - Apply Specific Commits',
    difficulty: 'Advanced',
    theory: [
      'Cherry-picking applies one specific commit from another branch to your current branch, without merging the entire branch. It\'s useful when you want one fix but not everything else in that branch.',
      'Use cherry-pick for selective backporting: if a bug fix is committed to main but you need it in the release branch too, cherry-pick that commit into the release branch.',
      'Arjun finds a critical bug fix in main that needs to be applied to the release-v1 branch. Instead of merging all of main, he cherry-picks just that bug fix commit.'
    ],
    syntax: `git cherry-pick <commit-hash>`,
    code: `# Main branch has a bug fix commit (abc123)
git log --oneline
# abc123 Fix critical login bug
# def456 Add new feature (not ready for release)

# Switch to release branch
git checkout release-v1

# Cherry-pick just the bug fix
git cherry-pick abc123

# Output:
# [release-v1 xyz789] Fix critical login bug
#  1 file changed, 5 insertions(+)

# release-v1 now has the bug fix, but not the new feature!
git log --oneline
# xyz789 Fix critical login bug
# def456 Previous release commit`,
    output: `[release-v1 xyz789] Fix critical login bug
 1 file changed, 5 insertions(+)`,
    notes: [
      'Cherry-pick copies a commit; it doesn\'t move it',
      'Useful for applying hotfixes to multiple branches',
      'The commit hash changes in the new location (different commit)',
      'Avoid over-using cherry-pick; usually merge is simpler'
    ],
    practice: {
      title: 'Practice Cherry-Pick (Advanced)',
      description: 'Create two branches with different commits, cherry-pick one into the other.',
      hint: 'Branch A has C1, C2, C3. Branch B should cherry-pick just C2.',
      solution: `git checkout -b branch-a
echo "C1" > c1.txt && git add . && git commit -m "C1"
echo "C2" > c2.txt && git add . && git commit -m "C2"
git log --oneline  # Note the C2 hash
git checkout -b branch-b main
git cherry-pick <C2-hash>
# branch-b now has C2 without C1`
    }
  },

  // ============ Remote Repositories (8 topics) ============

  {
    id: 'what-is-github',
    category: 'Remote Repositories',
    title: 'What is GitHub?',
    difficulty: 'Beginner',
    theory: [
      'GitHub is a cloud platform for hosting Git repositories. It\'s not Git itself — Git is the version control system; GitHub is where you store your code online. Think of Git as the tool and GitHub as the cloud storage service.',
      'GitHub lets multiple people access your code, collaborate on projects, track issues, review pull requests, and run automated tests. It\'s where professional developers host their work.',
      'ISRO, Infosys, Flipkart, and thousands of Indian tech companies use GitHub. Open source projects like Linux, Python, and Django are hosted on GitHub, making it essential knowledge for any developer.',
      'Priya and Arjun push their school project to GitHub so it\'s backed up online and they can access it from any device.'
    ],
    code: `# GitHub is a website: github.com
# No command-line code for this topic.
# Key features:
# - Repository hosting (your code backup)
# - Collaboration (team access)
# - Pull requests (review code before merging)
# - Issues (track bugs and features)
# - Actions (automate tests and deployment)
# - Pages (free static website hosting)`,
    notes: [
      'GitHub is free for public repositories; paid for private (though free private repos are common now)',
      'GitHub is owned by Microsoft but remains the industry standard',
      'Competitors exist (GitLab, Gitea, Bitbucket) but GitHub is most popular',
      'Create an account at github.com to get started'
    ],
    practice: {
      title: 'Create a GitHub Account',
      description: 'Sign up for a free GitHub account at github.com.',
      hint: 'Visit github.com, click Sign Up, and fill in your details.',
      solution: 'Go to https://github.com/signup and create a free account with your email.'
    }
  },

  {
    id: 'git-clone',
    category: 'Remote Repositories',
    title: 'git clone - Copy a Repository',
    difficulty: 'Beginner',
    theory: [
      '`git clone` downloads a complete copy of a repository from GitHub (or any remote server) to your computer. It includes all files, branches, and commit history. It\'s like downloading a project, but with full version control.',
      'Cloning is how you first get a project. After cloning, you have a complete local copy and can make changes, commit, and eventually push back to GitHub.',
      'When Arjun joins Priya\'s project, he uses `git clone` to download the entire project history, then starts contributing his own code.'
    ],
    syntax: `git clone <repository-url>`,
    code: `# Clone a public repository
git clone https://github.com/priya-sharma/school-project.git

# Output:
# Cloning into 'school-project'...
# remote: Enumerating objects: 45, done.
# remote: Counting objects: 100% (45/45), done.
# remote: Compressing objects: 100% (45/45), done.
# remote: Receiving objects: 100% (45/45), done.
# Resolving deltas: 100% (20/20), done.

# A new folder 'school-project' is created
cd school-project
git log
# You have all commit history!`,
    output: `Cloning into 'school-project'...
remote: Enumerating objects: 45, done.`,
    notes: [
      'Clone is a one-time download; use pull later to sync changes',
      'Find repository URLs on GitHub (green "Code" button)',
      'Cloning gives you access to all branches',
      'Clone is read-only unless you have push permission'
    ],
    practice: {
      title: 'Clone a Public Repository',
      description: 'Clone an open-source project from GitHub.',
      hint: 'Find a project on GitHub, copy its HTTPS URL, then `git clone <url>`',
      solution: `git clone https://github.com/freeCodeCamp/freeCodeCamp.git
cd freeCodeCamp
git log --oneline  # See the full history`
    }
  },

  {
    id: 'git-remote',
    category: 'Remote Repositories',
    title: 'git remote - Manage Remote Connections',
    difficulty: 'Beginner',
    theory: [
      '`git remote` manages connections between your local repository and remote servers (like GitHub). By default, cloning creates an "origin" remote pointing to the source repository.',
      'You can add multiple remotes to work with different servers. For example, origin (your GitHub repo) and upstream (the original repo you forked from).',
      'Arjun\'s local repository has a "origin" remote pointing to the GitHub repository where he pushes code. If the original project is owned by someone else, he might also have "upstream" pointing to the official repo.'
    ],
    syntax: `git remote -v                                 # List remotes
git remote add <name> <url>                 # Add remote
git remote remove <name>                    # Remove remote
git remote set-url <name> <new-url>         # Change URL`,
    code: `# After cloning, you have 'origin' by default
git remote -v

# Output:
# origin  https://github.com/priya-sharma/school-project.git (fetch)
# origin  https://github.com/priya-sharma/school-project.git (push)

# Add another remote (e.g., personal backup)
git remote add backup https://github.com/arjun-singh/backup.git

# List all remotes
git remote -v
# Output:
# origin   https://github.com/priya-sharma/school-project.git (fetch)
# origin   https://github.com/priya-sharma/school-project.git (push)
# backup   https://github.com/arjun-singh/backup.git (fetch)
# backup   https://github.com/arjun-singh/backup.git (push)

# Push to specific remote
git push origin main
git push backup main`,
    output: `origin  https://github.com/priya-sharma/school-project.git (fetch)
origin  https://github.com/priya-sharma/school-project.git (push)`,
    notes: [
      'origin is the default remote created by clone',
      'You can have multiple remotes for different purposes',
      'Fetch and push can go to different remotes'
    ],
    practice: {
      title: 'Check Your Remotes',
      description: 'Clone a repo and check its remotes.',
      hint: 'Clone any public repo, then `git remote -v`',
      solution: `git clone https://github.com/facebook/react.git
cd react
git remote -v
# You should see origin pointing to facebook/react`
    }
  },

  {
    id: 'git-push',
    category: 'Remote Repositories',
    title: 'git push - Upload Changes to Remote',
    difficulty: 'Beginner',
    theory: [
      '`git push` uploads your commits to a remote repository (usually GitHub). After you commit locally, you push to share your work with teammates and back it up in the cloud.',
      'Push is how Priya and Arjun share their code. Priya commits code locally, then pushes it to GitHub. Arjun pulls it to get the latest code on his computer.',
      'You push specific branches: `git push origin main` pushes the main branch, while `git push origin feature-x` pushes the feature-x branch.'
    ],
    syntax: `git push <remote> <branch>     # Push a branch
git push -u origin main        # Push and set upstream (first time)
git push --all                 # Push all branches`,
    code: `# After committing locally
git log --oneline
# abc123 Add homepage

# Push to GitHub
git push origin main

# Output:
# Counting objects: 3, done.
# Delta compression using up to 4 threads.
# Compressing objects: 100% (2/2), done.
# Writing objects: 100% (3/3), done.
# Total 3 (delta 0), reused 0 (delta 0)
# To https://github.com/priya-sharma/school-project.git
#    def456..abc123  main -> main

# Now the code is on GitHub!

# Push a feature branch
git push origin feature-login

# First time pushing, set upstream:
git push -u origin feature-login
# Next time, just: git push`,
    output: `To https://github.com/priya-sharma/school-project.git
 * [new branch]      feature-login -> feature-login`,
    notes: [
      'You need push permission to upload (must own repo or have access)',
      'Use -u flag to set upstream branch (simplifies future pushes)',
      'Push only committed code; uncommitted changes stay local',
      'GitHub will prompt for authentication (use personal access token or SSH key)'
    ],
    practice: {
      title: 'Push to GitHub (Requires Account)',
      description: 'Create a GitHub repository, clone it, make changes, and push.',
      hint: 'Create repo on GitHub → clone → add file → commit → push',
      solution: `# On GitHub, create "my-project" repo
git clone https://github.com/YOUR_USERNAME/my-project.git
cd my-project
echo "Hello" > hello.txt
git add hello.txt
git commit -m "Add hello file"
git push origin main`
    }
  },

  {
    id: 'git-pull',
    category: 'Remote Repositories',
    title: 'git pull - Download & Integrate Remote Changes',
    difficulty: 'Beginner',
    theory: [
      '`git pull` is the opposite of push. It downloads commits from the remote repository and integrates them into your current branch. It\'s essentially `git fetch` (download) + `git merge` (integrate) in one command.',
      'Pull keeps your local copy in sync with the team\'s work. If Priya pushes new code, Arjun pulls it to get the latest changes on his computer.',
      'You should pull before starting work and push after finishing to avoid conflicts.'
    ],
    syntax: `git pull <remote> <branch>     # Pull from remote
git pull                       # Pull from origin (default)`,
    code: `# Priya pushed code to GitHub
# Now Arjun wants the latest code

git pull origin main

# Output:
# remote: Enumerating objects: 3, done.
# remote: Counting objects: 100% (3/3), done.
# Unpacking objects: 100% (3/3), done.
# From https://github.com/priya-sharma/school-project
#    def456..abc123  main       -> origin/main
# Updating def456..abc123
# Fast-forward
#  homepage.html | 10 +++++++
#  1 file changed, 10 insertions(+)

# Arjun's local files now include Priya's changes!`,
    output: `Updating def456..abc123
Fast-forward
 homepage.html | 10 +++++++
 1 file changed, 10 insertions(+)`,
    notes: [
      'Pull merges remote changes; if you have conflicting local changes, you\'ll get a merge conflict',
      'Always pull before pushing to minimize conflicts',
      'Use `git pull --rebase` to rebase instead of merge (advanced)',
      'Pull fails if you have uncommitted changes that would conflict'
    ],
    practice: {
      title: 'Pull from Remote (Requires Teamwork or Simulation)',
      description: 'Push code from one location, then pull from another to simulate teamwork.',
      hint: 'Make a change and push in one folder, then clone and pull in another',
      solution: `# Simulate: make a change on "Priya's" computer
git commit -m "Update" && git push origin main
# On "Arjun's" computer:
git pull origin main
# You get Priya's changes!`
    }
  },

  {
    id: 'git-fetch',
    category: 'Remote Repositories',
    title: 'git fetch - Download Without Merging',
    difficulty: 'Intermediate',
    theory: [
      '`git fetch` downloads commits from the remote but doesn\'t integrate them into your branch yet. It\'s safer than pull because it doesn\'t modify your working directory or current branch. You can inspect the changes before merging.',
      'After fetch, use `git merge` to integrate, or `git diff origin/main main` to compare before merging.',
      'Arjun fetches to see what Priya has pushed, reviews the changes, and then merges if everything looks good.'
    ],
    syntax: `git fetch <remote>              # Fetch from remote
git fetch                       # Fetch from all remotes`,
    code: `# Download changes without integrating
git fetch origin

# Output:
# remote: Enumerating objects: 5, done.
# remote: Counting objects: 100% (5/5), done.
# From https://github.com/priya-sharma/school-project
#    abc123..def456  main       -> origin/main

# Your working directory is unchanged!
git status
# Output: Your branch is behind 'origin/main' by 2 commits.

# Compare before merging
git diff main origin/main

# Now merge if satisfied
git merge origin/main`,
    output: `From https://github.com/priya-sharma/school-project
   abc123..def456  main -> origin/main`,
    notes: [
      'Fetch is safe; it doesn\'t change your code',
      'After fetch, you can review with git diff before merging',
      'Pull = Fetch + Merge (in one command)',
      'Use fetch for read-only inspection'
    ],
    practice: {
      title: 'Practice Fetch (Advanced)',
      description: 'Fetch from remote without merging, then inspect changes.',
      hint: 'git fetch origin && git diff main origin/main && git merge',
      solution: `git fetch origin
git log --oneline origin/main
# See what's new without merging
git merge origin/main  # Now merge`
    }
  },

  {
    id: 'fork-pull-request',
    category: 'Remote Repositories',
    title: 'Fork & Pull Request Workflow',
    difficulty: 'Intermediate',
    theory: [
      'When you don\'t have direct push access to a repository, you fork it (create your own copy), make changes in your fork, then submit a pull request asking the original owner to accept your changes.',
      'Forking is how open source works: anyone can fork a project, fix bugs, and submit pull requests. The maintainers review and merge if the code is good.',
      'Priya wants to contribute to an open source project. She forks it on GitHub, clones her fork, makes improvements, and submits a pull request to the original project.'
    ],
    code: `# Step 1: Fork on GitHub (click "Fork" button on repo page)
# Step 2: Clone YOUR fork (not the original)
git clone https://github.com/priya-sharma/open-source-project.git
cd open-source-project

# Step 3: Make changes and commit
echo "Bug fix" > bug-fix.js
git add bug-fix.js
git commit -m "Fix critical bug in authentication"

# Step 4: Push to your fork
git push origin main

# Step 5: On GitHub, click "Create Pull Request"
# Step 6: Add description and submit
# The original maintainers review and merge (or request changes)`,
    output: `Pushing to your fork...
[main abc1234] Fix critical bug in authentication`,
    notes: [
      'Forking creates a personal copy under your GitHub account',
      'Pull requests notify original maintainers of your changes',
      'Keep your fork in sync with upstream using upstream remote',
      'Many contributions to Linux, Python, etc. started with a fork and PR'
    ],
    practice: {
      title: 'Practice Fork Workflow (GitHub Required)',
      description: 'Fork a public repository, make a change, and submit a PR.',
      hint: 'Click Fork → clone your fork → commit → push → create PR on GitHub',
      solution: 'Find a repo on GitHub → click Fork → clone YOUR fork → make changes → push → go to GitHub and click "Create Pull Request"'
    }
  },

  {
    id: 'upstream-remote',
    category: 'Remote Repositories',
    title: 'Upstream Remote - Keep Fork in Sync',
    difficulty: 'Intermediate',
    theory: [
      'When you fork a repository, your fork is a snapshot at that moment. The original repository (called "upstream") continues to evolve. You need to sync your fork with upstream to stay current.',
      'Setup: origin = your fork, upstream = original repo. You fetch from upstream to get latest changes, merge them into your local branch, then push to your fork (origin).',
      'Priya forked a popular open source project 2 weeks ago. Since then, 50 new commits were added to the original. She syncs her fork with upstream to get the latest code.'
    ],
    syntax: `# Add upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/repo.git

# Fetch from upstream
git fetch upstream

# Merge upstream's main into your local main
git merge upstream/main

# Push updated code to your fork
git push origin main`,
    code: `# After forking, setup upstream
git clone https://github.com/priya-sharma/my-fork.git
cd my-fork

# Add upstream (original repo)
git remote add upstream https://github.com/original-owner/repo.git

# List remotes
git remote -v
# Output:
# origin     https://github.com/priya-sharma/my-fork.git
# upstream   https://github.com/original-owner/repo.git

# Fetch latest from upstream
git fetch upstream

# Merge upstream changes into your local main
git checkout main
git merge upstream/main

# Push to your fork
git push origin main`,
    output: `* [new branch]      main       -> upstream/main
Updating abc123..def456
Fast-forward
 file.js | 5 ++++-`,
    notes: [
      'Always fetch upstream before starting new work on a fork',
      'This keeps your fork compatible with the original project',
      'Essential for long-term open source contributions'
    ],
    practice: {
      title: 'Setup and Sync with Upstream (Advanced)',
      description: 'Fork a repo, add upstream remote, and sync it.',
      hint: 'git remote add upstream <original-url> && git fetch upstream && git merge upstream/main',
      solution: `git remote add upstream https://github.com/ORIGINAL/repo.git
git fetch upstream
git merge upstream/main
git push origin main`
    }
  },

  // ============ Collaboration (7 topics) ============

  {
    id: 'pull-request-workflow',
    category: 'Collaboration',
    title: 'Pull Request Workflow - Review & Merge',
    difficulty: 'Intermediate',
    theory: [
      'A Pull Request (PR) is a request to merge your code into main. It\'s how teams review code before it goes live. The workflow is: create a feature branch → push to GitHub → open PR → discuss → approve → merge.',
      'PRs enable code review, automated testing, and team discussion. Everyone sees what changed and can comment before approval.',
      'Priya finishes the homepage feature, pushes her branch to GitHub, opens a PR titled "Add responsive homepage". Arjun reviews, suggests improvements, Priya updates, Arjun approves, then merges.'
    ],
    code: `# Step 1: Create and push feature branch
git checkout -b feature/responsive-homepage
echo "<html>...</html>" > index.html
git add index.html
git commit -m "Add responsive homepage layout"
git push origin feature/responsive-homepage

# Step 2: On GitHub, click "Create Pull Request"
# Fill in title: "Add responsive homepage layout"
# Add description: "Implements mobile-friendly design using CSS Grid"

# Step 3: Reviewers comment on the PR
# "Great! But can you fix the mobile spacing in the footer?"

# Step 4: Make requested changes locally
echo "/* improved footer */" >> index.html
git add index.html
git commit -m "Fix mobile footer spacing"
git push origin feature/responsive-homepage  # Push updates to same branch

# Step 5: Reviewer approves
# "Looks great! Merging now..."

# Step 6: Merge on GitHub (click "Merge pull request")
# Or from command line:
git checkout main
git pull origin main
git merge feature/responsive-homepage
git push origin main`,
    output: `[feature/responsive-homepage abc123] Add responsive homepage layout`,
    notes: [
      'PR title should be clear: "Add X" not "fix stuff"',
      'Describe what changed and why in the description',
      'Respond to review comments promptly',
      'Most professional teams require at least one approval before merging'
    ],
    practice: {
      title: 'Create a Pull Request (GitHub Required)',
      description: 'Create a branch, push to GitHub, and open a PR.',
      hint: 'Create branch → make changes → push → click "Create Pull Request" on GitHub',
      solution: `git checkout -b feature/awesome
echo "awesome code" > awesome.js
git add . && git commit -m "Add awesome feature"
git push origin feature/awesome
# Then on GitHub, click "New pull request" for your branch`
    }
  },

  {
    id: 'code-review',
    category: 'Collaboration',
    title: 'Code Review & Feedback',
    difficulty: 'Intermediate',
    theory: [
      'Code review is a team process where developers examine each other\'s code for bugs, style, security, and performance. It\'s not criticism — it\'s collaborative improvement. Comments should be constructive and professional.',
      'As a reviewer, look for: correctness, readability, performance, security, and tests. As a submitter, respond gracefully to feedback and thank reviewers for their time.',
      'Arjun reviews Priya\'s PR. He comments "Can you add error handling for this API call?" Priya appreciates the feedback, adds the error handling, and Arjun approves.'
    ],
    code: `# Example PR comment thread on GitHub:

# Priya's code (in PR):
fetch('/api/users')
  .then(data => console.log(data))

# Arjun's review comment:
"This needs error handling. What if the API request fails?"

# Priya's response and update:
fetch('/api/users')
  .then(data => console.log(data))
  .catch(error => console.error('Failed to fetch users:', error))

# Arjun's reply:
"Perfect! Thanks for adding error handling."`,
    notes: [
      'Be respectful in reviews — code review is collaborative',
      'Ask questions instead of making demands: "Did you consider...?" not "This is wrong"',
      'Praise good code: "Nice optimization!"',
      'Respond to all comments before marking as ready for re-review',
      'Learn from feedback — reviews improve your skills'
    ],
    practice: {
      title: 'Simulate Code Review (Conceptual)',
      description: 'Understand code review mindset; no implementation needed.',
      hint: 'Read example feedback, think about how you\'d respond constructively',
      solution: 'Code review is peer feedback. Be humble when criticized, be kind when reviewing. Focus on code, not ego.'
    }
  },

  {
    id: 'github-issues',
    category: 'Collaboration',
    title: 'GitHub Issues - Track Bugs & Features',
    difficulty: 'Beginner',
    theory: [
      'GitHub Issues are tickets for bugs, features, and tasks. Instead of emails or chat, the team tracks work in Issues. Each issue can have discussion, labels, and assignment to team members.',
      'Issues keep projects organized. You can search by label ("bug", "documentation", "help wanted"), link issues to PRs, and track progress.',
      'Arjun discovers a bug and creates an Issue titled "Login button breaks on mobile". Priya assigns it to herself, links her PR fixing it, and closes the issue when done.'
    ],
    code: `# On GitHub Issues page, click "New Issue"

# Title: "Login button breaks on mobile devices"
# Description:
"""
**Bug Description:**
The login button doesn't respond to clicks on iPhones and Android phones.

**Steps to Reproduce:**
1. Open the app on a mobile device
2. Navigate to the login page
3. Click the login button
4. Button doesn't work

**Expected Behavior:**
Button should submit the login form

**Screenshots:**
[attach screenshot showing broken button]

**Environment:**
- Browser: Safari iOS 17, Chrome Android 120
- Device: iPhone 14, Samsung Galaxy A50
"""

# Add labels: bug, priority-high, mobile
# Assign to: priya-sharma
# Create Issue

# Later, Priya submits PR #42 fixing it
# In the PR, write: "Fixes #15" (links issue to PR)
# When PR is merged, the issue auto-closes`,
    notes: [
      'Use clear titles: "Login broken on iOS" not "Bug"',
      'Include: description, steps to reproduce, expected behavior, environment',
      'Link PRs to issues with "Fixes #123" to auto-close on merge',
      'Labels help organize issues (bug, feature, documentation, etc.)'
    ],
    practice: {
      title: 'Create a GitHub Issue (GitHub Required)',
      description: 'Create a sample issue on a GitHub repository.',
      hint: 'Go to Issues tab → New Issue → fill in title and description',
      solution: 'Click Issues → New Issue → Title: "Improve documentation" → Description: "The README is unclear about setup steps" → Create'
    }
  },

  {
    id: 'github-actions-intro',
    category: 'Collaboration',
    title: 'GitHub Actions - Automate Testing & Deployment',
    difficulty: 'Intermediate',
    theory: [
      'GitHub Actions automatically runs tests, linters, and deployments when code is pushed or a PR is opened. This ensures quality without manual work. For example, every PR is tested before merge.',
      'Workflows are defined in `.github/workflows/*.yml` files. A simple workflow might: install dependencies, run tests, lint code, and report results.',
      'Priya and Arjun add a workflow that runs tests on every PR. If tests fail, the PR can\'t be merged. This prevents broken code from reaching main.'
    ],
    code: `# File: .github/workflows/test.yml
name: Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: 18
    - name: Install dependencies
      run: npm install
    - name: Run tests
      run: npm test
    - name: Lint code
      run: npm run lint`,
    notes: [
      'Actions run automatically on push/PR without manual intervention',
      'Common actions: run tests, deploy to server, check code quality',
      'Free for public repos; limited free runners for private repos',
      'GitHub Actions is powerful — can do anything you can do in terminal'
    ],
    practice: {
      title: 'Explore GitHub Actions (GitHub Required)',
      description: 'Look at Actions in a GitHub repo (no setup needed).',
      hint: 'Go to a GitHub repo → Actions tab → see example workflows',
      solution: 'GitHub Actions are automated workflows. You\'ll learn more with practice!'
    }
  },

  {
    id: 'branch-protection',
    category: 'Collaboration',
    title: 'Branch Protection Rules',
    difficulty: 'Intermediate',
    theory: [
      'Branch protection prevents accidental merges to main. You can require: PR approval, passing tests, updated branches, and status checks. This enforces quality gates.',
      'Example rules: "Require at least 2 approvals before merge" or "Require status checks to pass". This protects production from broken code.',
      'Priya sets up branch protection on main so that: (1) every change requires a PR, (2) tests must pass, (3) Arjun must approve. This prevents bad code from reaching production.'
    ],
    code: `# On GitHub, go to Settings → Branches → Add Rule

# Configure for main branch:
1. Require pull request reviews before merging ✓
   - Require 2 approvals
   - Require review from code owners
2. Require status checks to pass
   - tests (must pass before merge)
   - lint-check (must pass before merge)
3. Require branches to be up to date
4. Require code owner review
5. Dismiss stale PR approvals
6. Require conversation resolution

# Result: main is protected from accidental/bad merges!`,
    notes: [
      'Most production repos require branch protection',
      'Prevents anyone (even admins) from directly pushing to main',
      'Enforces PR workflow for all changes',
      'Commonly used at ISRO, Infosys, Amazon India, etc.'
    ],
    practice: {
      title: 'Understand Branch Protection (Conceptual)',
      description: 'Learn the concept; implementation requires admin access.',
      hint: 'Imagine: main requires 2 approvals + passing tests before any merge',
      solution: 'Branch protection is a safety mechanism. Most professional teams use it to ensure quality code reaches production.'
    }
  },

  {
    id: 'squash-merge',
    category: 'Collaboration',
    title: 'Squash Merge - Combine Commits',
    difficulty: 'Intermediate',
    theory: [
      'Squash merge combines all commits from a feature branch into a single commit before merging to main. This keeps main\'s history clean by avoiding many small "work in progress" commits.',
      'Example: your feature branch has 10 commits (many with "fix typo", "oops", "trying again"). Squash merge compresses these into 1 clean commit in main.',
      'GitHub has a "Squash and merge" button. Priya submits a PR with 15 commits; GitHub squashes them into 1 commit when merged to main.'
    ],
    syntax: `# On GitHub PR, click "Squash and merge" instead of "Create merge commit"`,
    code: `# Feature branch: feature/login (15 commits)
git log feature/login --oneline
# abc123 Add login form
# def456 Fix typo
# ghi789 Oops, fix import
# jkl012 Update styling
# ...

# Squash merge to main
# (Use GitHub "Squash and merge" button)

# Result in main: 1 clean commit
git log main --oneline
# xyz000 Add login form  (15 commits squashed into 1)
# uvw999 Previous feature`,
    notes: [
      'Squash merge keeps main clean and easier to read',
      'Use for feature branches with many WIP commits',
      'Don\'t use squash for long-term branches (you lose history)',
      'GitHub UI has "Squash and merge" option'
    ],
    practice: {
      title: 'Understand Squash Merge (Conceptual)',
      description: 'Learn when and why to use squash merge.',
      hint: 'Squash = combine many commits into one',
      solution: 'Squash merging simplifies history. If your feature branch has 20 commits, squash them into 1 clean commit before merging to main.'
    }
  },

  {
    id: 'git-blame',
    category: 'Collaboration',
    title: 'git blame - Track Code Changes by Author',
    difficulty: 'Advanced',
    theory: [
      'git blame shows who wrote each line of code and when. It answers "Who added this line?" and "When was it added?". Useful for understanding code history and reaching out to the original author.',
      'On GitHub, you can click on a line to see the commit and author. In the terminal, `git blame file.js` shows line-by-line authorship.',
      'Arjun finds a strange line of code and wonders who added it. He uses `git blame` to see "Priya added this on 2024-01-15 in commit abc123 for fixing issue #42".'
    ],
    syntax: `git blame <file>                # Show authorship of each line
git blame -L 10,20 <file>       # Blame specific lines 10-20`,
    code: `# Check who wrote each line of app.js
git blame app.js

# Output:
# abc1234 (Priya Sharma   2024-01-15 10:30) 1) const app = require('express');
# def5678 (Arjun Singh    2024-01-16 14:20) 2) const port = 3000;
# abc1234 (Priya Sharma   2024-01-15 10:45) 3)
# ghi9012 (Priya Sharma   2024-01-17 09:15) 4) app.get('/', (req, res) => {
# ghi9012 (Priya Sharma   2024-01-17 09:15) 5)   res.send('Hello');
# def5678 (Arjun Singh    2024-01-16 14:25) 6) });

# Click the commit hash to see full details
git show abc1234  # See commit abc1234

# GitHub: On any file, click "Blame" button to see authorship visually`,
    output: `abc1234 (Priya Sharma   2024-01-15) const app = require('express');
def5678 (Arjun Singh    2024-01-16) const port = 3000;`,
    notes: [
      'Blame is neutral — it\'s not about fault, just understanding',
      'Use to contact author if you have questions about their code',
      'GitHub shows blame inline on file view',
      'Helps onboard new team members by showing who knows what'
    ],
    practice: {
      title: 'Use git blame (Advanced)',
      description: 'View authorship of lines in a cloned repository.',
      hint: 'Clone a repo with history, then `git blame <filename>`',
      solution: `git clone https://github.com/freeCodeCamp/freeCodeCamp.git
cd freeCodeCamp
git blame README.md  # See who wrote each line`
    }
  },

  // ============ Advanced Git (7 topics) ============

  {
    id: 'git-reset',
    category: 'Advanced Git',
    title: 'git reset - Undo Commits',
    difficulty: 'Advanced',
    theory: [
      'git reset moves the branch pointer backwards to an earlier commit. It has three modes: soft (keep changes staged), mixed (keep changes unstaged), and hard (discard all changes). Be careful with hard reset!',
      'Use cases: undo the last commit, unstage files, or go back to an earlier point in history. Soft reset is safest (you don\'t lose work), hard reset is dangerous (you lose uncommitted changes).',
      'Priya committed a file by mistake. She uses `git reset --soft HEAD~1` to undo the commit but keep the changes, so she can re-commit without that file.'
    ],
    syntax: `git reset --soft HEAD~1         # Undo last commit, keep changes staged
git reset --mixed HEAD~1        # Undo last commit, keep changes unstaged
git reset --hard HEAD~1         # Undo last commit, discard all changes (DANGER)`,
    code: `# Scenario: Priya committed something wrong
git log --oneline
# abc123 Add homepage
# def456 Wrong commit (Oops!)
# ghi789 Previous work

# Undo last commit with soft reset (safest)
git reset --soft HEAD~1

# Output: nothing (but commit is undone)
git status
# Output: Changes to be committed: (files from wrong commit)

# Now you can re-commit without the file you didn't want
# Or just unstage and edit

# Hard reset (DANGEROUS - loses work)
git reset --hard HEAD~1
# Files revert to ghi789 commit; everything since then is lost!`,
    output: `HEAD is now at ghi789 Previous work`,
    notes: [
      'Soft reset = safest; you keep the work',
      'Hard reset = dangerous; you lose uncommitted changes forever',
      'Mixed reset = middle ground; changes are unstaged',
      'Use reflog if you accidentally hard reset: `git reflog` shows history'
    ],
    practice: {
      title: 'Practice git reset (Safely)',
      description: 'Use soft reset to undo a commit without losing work.',
      hint: 'Commit something → git reset --soft HEAD~1 → check status',
      solution: `echo "test" > test.txt && git add . && git commit -m "Test"
git reset --soft HEAD~1
git status  # You should see test.txt as staged again`
    }
  },

  {
    id: 'git-revert',
    category: 'Advanced Git',
    title: 'git revert - Safely Undo Changes',
    difficulty: 'Advanced',
    theory: [
      'git revert creates a NEW commit that undoes a previous commit. Unlike reset, it doesn\'t rewrite history — it adds a commit saying "undo commit abc123". This is safer for shared/public branches.',
      'Use revert when commits are already pushed publicly. Use reset only for local commits. Revert preserves history and doesn\'t confuse teammates.',
      'Arjun pushed a bad commit to GitHub. Instead of resetting (which would require force push and confuse everyone), he reverts, creating a new commit that undoes the bad one.'
    ],
    syntax: `git revert <commit-hash>        # Create commit undoing specified commit`,
    code: `# Bad commit is in history
git log --oneline
# abc123 Added bad feature
# def456 Previous commit

# Revert the bad commit (creates a new "undo" commit)
git revert abc123

# Git opens editor for commit message
# Default: "Revert 'Added bad feature'"
# Save and exit

# Output:
# [main xyz789] Revert "Added bad feature"
#  1 file changed, 1 deletion(-)

# History now shows:
git log --oneline
# xyz789 Revert "Added bad feature"  (NEW undo commit)
# abc123 Added bad feature           (original bad commit stays)
# def456 Previous commit`,
    output: `[main xyz789] Revert "Added bad feature"
 1 file changed, 1 deletion(-)`,
    notes: [
      'Revert is safe for public/shared branches',
      'Reset is only for local branches (not yet pushed)',
      'Revert keeps history clean and transparent',
      'Everyone sees what was undone and why'
    ],
    practice: {
      title: 'Practice git revert',
      description: 'Make a commit, then revert it with a undo commit.',
      hint: 'Commit → git revert <hash> → check log',
      solution: `echo "bad" > bad.txt && git add . && git commit -m "Bad"
git log --oneline  # Note the hash
git revert <HASH>
# You should see a new "Revert" commit`
    }
  },

  {
    id: 'git-amend',
    category: 'Advanced Git',
    title: 'git commit --amend - Modify Last Commit',
    difficulty: 'Intermediate',
    theory: [
      'git commit --amend modifies the last commit without creating a new one. Use it to fix commit messages, add forgotten files, or improve the last commit. Only use on local commits (before pushing).',
      'Instead of making a new commit for a typo fix, you can amend the last commit. It rewrites history but is useful for polish.',
      'Priya commits with a typo in the message: "Add homepge design". Instead of another commit, she uses `--amend` to fix it to "Add homepage design".'
    ],
    syntax: `git commit --amend -m "New message"         # Rewrite commit message
git add file.txt && git commit --amend     # Add file to last commit`,
    code: `# Scenario 1: Fix commit message
git log --oneline
# abc123 Add homepge design  (typo!)

git commit --amend -m "Add homepage design"

# Output: [main def456] Add homepage design
# (Note: commit hash changed because we rewrote it)

# Scenario 2: Add a file you forgot
echo "forgotten.js" > forgotten.js
git add forgotten.js
git commit --amend

# (no -m, so Git opens editor for existing message)
# The file is added to the last commit (no new commit)

git log --oneline
# def456 Add homepage design (now includes forgotten.js)`,
    output: `[main def456] Add homepage design`,
    notes: [
      'Only amend local commits (before pushing)',
      'Amending rewrites history; don\'t do it on public branches',
      'Great for fixing typos or adding forgotten files',
      'If you already pushed, you\'ll need force push (risky)'
    ],
    practice: {
      title: 'Practice git amend',
      description: 'Commit, then amend the message.',
      hint: 'Commit → git commit --amend -m "new message"',
      solution: `echo "test" > t.txt && git add . && git commit -m "Add test"
git commit --amend -m "Add test file (fixed message)"
git log --oneline  # Should show the amended message`
    }
  },

  {
    id: 'git-reflog',
    category: 'Advanced Git',
    title: 'git reflog - Recover Lost Work',
    difficulty: 'Advanced',
    theory: [
      'git reflog shows a log of where HEAD has been (all your recent moves). If you accidentally reset or delete a commit, reflog can help you find it and recover it.',
      'Unlike git log, reflog shows your local branch movements, not commit history. It\'s a safety net if you do something wrong.',
      'Arjun accidentally does `git reset --hard` and loses 3 commits. He uses `git reflog` to find where those commits were, then `git reset` to get them back.'
    ],
    syntax: `git reflog                       # Show ref updates (branch movements)
git reset --hard <reflog-entry>  # Recover from reflog entry`,
    code: `# You have commits and branches moving around
git reflog

# Output:
# abc123 HEAD@{0}: commit: Add feature
# def456 HEAD@{1}: reset: moving to HEAD~1
# ghi789 HEAD@{2}: commit: Fix bug
# jkl012 HEAD@{3}: checkout: moving to feature
# ...

# Oops, you did 'git reset --hard' and lost commits!
# Find where you were in reflog
git reflog
# Shows abc123 (Add feature) was the last good state

# Recover the lost commits
git reset --hard abc123

# Your commits are back!`,
    output: `abc123 HEAD@{0}: commit: Add feature
def456 HEAD@{1}: reset: moving to HEAD~1`,
    notes: [
      'Reflog is your safety net for "undo" operations',
      'Reflog is local (not backed up on GitHub)',
      'Can recover from accidentally deleted branches',
      'Reflog entries expire (usually after 30 days)'
    ],
    practice: {
      title: 'View Reflog (Conceptual)',
      description: 'Understanding reflog; no risky operations needed.',
      hint: 'git reflog shows your recent HEAD movements',
      solution: 'Reflog is a safety mechanism. If you mess up with reset/rebase, you can recover from reflog.'
    }
  },

  {
    id: 'git-bisect',
    category: 'Advanced Git',
    title: 'git bisect - Find Broken Commits',
    difficulty: 'Advanced',
    theory: [
      'git bisect does binary search through commits to find which one introduced a bug. You mark commits as "good" or "bad", and Git narrows down the culprit automatically. Useful when a bug appeared but you don\'t know which commit caused it.',
      'Scenario: the app worked 10 commits ago but is broken now. Instead of manually checking each commit, bisect finds the exact commit that broke it.',
      'Priya notices the login is broken but doesn\'t know when it broke. Arjun uses git bisect to narrow down which of 30 commits is the culprit in about 5 checks.'
    ],
    syntax: `git bisect start
git bisect bad HEAD              # Mark current commit as bad
git bisect good <good-commit>    # Mark an earlier commit as good
# Git checks out a commit in between for testing
git bisect bad / git bisect good  # Mark each as bad/good
# Repeat until Git finds the culprit
git bisect reset                 # Exit bisect mode`,
    code: `# Login was working in commit abc123 (10 days ago)
# It's broken now (HEAD)

git bisect start
git bisect bad HEAD              # Current is broken
git bisect good abc123           # That old commit worked

# Git checks out a commit in between (binary search)
# Test: does login work here?
# Answer: bad
git bisect bad

# Git checks out another commit
# Test: does it work?
# Answer: good
git bisect good

# (repeat a few more times)

# Finally:
# Output: def456 is the first bad commit
# See what changed
git show def456

# Ah! That commit added a breaking change to the auth library.
git bisect reset  # Exit bisect mode`,
    output: `def456 is the first bad commit
commit def456
Author: Arjun <arjun@example.com>
Date: Mon Jan 15

    Update authentication library`,
    notes: [
      'Bisect is powerful for finding bugs in large histories',
      'Requires automated way to test (pass/fail)',
      'Essential for large projects with many commits',
      'Can automate: `git bisect run ./test.sh`'
    ],
    practice: {
      title: 'Understand git bisect (Advanced)',
      description: 'Learn the concept; practical use requires large commit history.',
      hint: 'Git bisect does binary search to find the bad commit',
      solution: 'Bisect is for finding bugs in history. Useful in large projects but requires manual marking as good/bad at each step.'
    }
  },

  {
    id: 'git-tags',
    category: 'Advanced Git',
    title: 'git tag - Mark Release Versions',
    difficulty: 'Intermediate',
    theory: [
      'Tags mark specific commits as important milestones, usually releases. Unlike branches, tags don\'t move. A tag "v1.0.0" always points to the same commit.',
      'Semantic versioning: v1.0.0 means major.minor.patch. Use tags to mark production releases that users download.',
      'When Priya releases the school project, she tags the commit with "v1.0" so students can download exactly that version. Later, "v1.1" marks the next release.'
    ],
    syntax: `git tag <tag-name>               # Create lightweight tag
git tag -a <tag-name> -m "message"  # Create annotated tag
git tag -l                          # List tags
git push origin <tag-name>          # Push tag to GitHub`,
    code: `# Create a tag for version 1.0
git tag v1.0.0

# Create an annotated tag (recommended for releases)
git tag -a v1.0.0 -m "Release version 1.0.0"

# List all tags
git tag -l
# Output:
# v0.9.0
# v1.0.0

# See tag details
git show v1.0.0
# Output: points to commit abc123, created on date X, message

# Push tags to GitHub
git push origin v1.0.0
git push origin --tags  # Push all tags

# Later, clone a specific tag:
git clone --branch v1.0.0 https://github.com/priya/project.git`,
    output: `v0.9.0
v1.0.0`,
    notes: [
      'Tags are permanent markers; don\'t reuse tag names',
      'Annotated tags are recommended (include author, date, message)',
      'GitHub displays tags as releases for download',
      'Users can check out tag version: `git checkout v1.0.0`'
    ],
    practice: {
      title: 'Create Git Tags',
      description: 'Create a tag on a commit to mark a release.',
      hint: 'git tag v1.0.0 && git tag -l',
      solution: `git tag -a v1.0.0 -m "First release"
git tag -l
# You should see v1.0.0 listed`
    }
  },

  {
    id: 'git-submodules',
    category: 'Advanced Git',
    title: 'git submodules - Include External Repositories',
    difficulty: 'Advanced',
    theory: [
      'Submodules let you include another Git repository inside your project. Use when you depend on an external library or shared code. The submodule stays linked to its original repository, so you get updates.',
      'Example: your main project depends on a UI library stored in a separate repo. Add the library as a submodule, and you can pull updates from the library repo without copying code.',
      'Priya\'s project uses a shared authentication library in another repo. Instead of copying code, she adds it as a submodule and stays in sync with updates.'
    ],
    syntax: `git submodule add <repo-url> <path>     # Add submodule
git clone --recurse-submodules <repo-url>  # Clone with submodules
git submodule update --remote              # Update submodule to latest`,
    code: `# Add a library as a submodule
git submodule add https://github.com/lib/auth-library.git lib/auth

# This creates:
# - .gitmodules file (config for submodules)
# - lib/auth folder (the library code)

# When teammates clone:
git clone --recurse-submodules https://github.com/priya/school-project.git

# Or update submodules in existing clone:
git submodule update --init --recursive

# Update submodule to latest from its repo:
cd lib/auth
git pull origin main
cd ../..
git add lib/auth
git commit -m "Update auth library"`,
    notes: [
      'Submodules are complex; use sparingly',
      'Good for large projects with shared code',
      'Teammates must remember to `--recurse-submodules`',
      'Can cause confusion; simpler alternatives: npm packages, monorepos'
    ],
    practice: {
      title: 'Understand Submodules (Advanced)',
      description: 'Learn concept; practical use is rare for school projects.',
      hint: 'Submodules embed another repo inside yours',
      solution: 'Submodules link external repos. Useful in large projects with shared dependencies, but complex and often replaced by package managers.'
    }
  },

  // ============ GitHub Features (5 topics) ============

  {
    id: 'github-pages',
    category: 'GitHub Features',
    title: 'GitHub Pages - Host Static Websites',
    difficulty: 'Beginner',
    theory: [
      'GitHub Pages hosts your static website (HTML, CSS, JS) for free directly from your GitHub repository. Just push your code and GitHub serves it on the web.',
      'Perfect for portfolios, documentation, blogs, and project showcases. No server needed — GitHub handles hosting. Your website URL is username.github.io/repo-name.',
      'Priya and Arjun push their school project website to GitHub and enable Pages. Their project is instantly live on the internet at priya.github.io/school-project without any server setup.'
    ],
    code: `# Setup GitHub Pages in 3 steps:

# Step 1: Create index.html in your repo
echo "<h1>Welcome to My Site</h1>" > index.html

# Step 2: Commit and push
git add index.html
git commit -m "Add index.html"
git push origin main

# Step 3: On GitHub, go to Settings → Pages
# Select: Source = main branch, /(root) folder
# GitHub will say: "Your site is published at https://username.github.io/repo-name"

# Your site is live!
# Update index.html anytime and push; changes appear automatically`,
    notes: [
      'GitHub Pages serves from main branch or gh-pages branch',
      'Perfect for static sites (HTML/CSS/JS)',
      'Not suitable for dynamic content (databases, Node.js servers)',
      'Free SSL/HTTPS included'
    ],
    practice: {
      title: 'Deploy with GitHub Pages (GitHub Required)',
      description: 'Create an index.html and enable GitHub Pages.',
      hint: 'Create index.html → commit → push → enable Pages in Settings',
      solution: `echo "<html><body><h1>My Site</h1></body></html>" > index.html
git add . && git commit -m "Add site" && git push origin main
# Then on GitHub Settings → Pages → enable it`
    }
  },

  {
    id: 'readme-md',
    category: 'GitHub Features',
    title: 'README.md - Document Your Project',
    difficulty: 'Beginner',
    theory: [
      'README.md is the first file visitors see on your GitHub repository. It explains what the project is, how to install/use it, and how to contribute. Write it for humans, not code.',
      'Good READMEs increase adoption and attract contributors. They show professionalism and respect for users.',
      'Priya creates a README.md for the school project explaining: what it is, how to run it locally, project structure, and how Arjun can contribute.'
    ],
    code: `# File: README.md

# School Project Website

A responsive website for our school project built with HTML, CSS, and JavaScript.

## Features
- Responsive mobile-first design
- Navigation menu with smooth scrolling
- Contact form with validation
- Dark mode toggle

## Installation

\'\'\`bash
git clone https://github.com/priya/school-project.git
cd school-project
python -m http.server 8000  # or use any local server
\'\'\`

## Usage

1. Open \'index.html\' in your browser
2. Click menu items to navigate
3. Fill the contact form to send messages

## Project Structure

\'\'\`
school-project/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── README.md
\'\'\`

## Contributing

1. Fork the repository
2. Create a feature branch: \'git checkout -b feature/new-feature\'
3. Commit changes: \'git commit -m "Add new feature"\'
4. Push: \'git push origin feature/new-feature\'
5. Submit a pull request

## Authors

- Priya Sharma
- Arjun Singh

## License

MIT License (or your choice)`,
    notes: [
      'Use Markdown formatting for clarity',
      'Include: description, installation, usage, contributing',
      'Keep it updated as project evolves',
      'README is the first impression'
    ],
    practice: {
      title: 'Write a README.md',
      description: 'Create a README for any project (real or test).',
      hint: 'Create README.md with title, description, and usage instructions',
      solution: `cat > README.md << 'EOF'
# My Project

Brief description.

## Installation
Instructions here.

## Usage
How to use here.

## License
MIT
EOF
git add README.md && git commit -m "Add README"`
    }
  },

  {
    id: 'github-gist',
    category: 'GitHub Features',
    title: 'GitHub Gist - Share Code Snippets',
    difficulty: 'Beginner',
    theory: [
      'GitHub Gist is a simple way to share code snippets, configurations, or notes. It\'s like Pastebin but with version control and syntax highlighting. Perfect for sharing quick solutions without a full repository.',
      'Gists can be public (searchable) or secret (not discoverable but accessible via link). Each gist has its own Git history.',
      'Arjun finds a solution to a problem and creates a Gist to share with Priya. She can view it, comment, clone it, or embed it in her blog.'
    ],
    code: `# Creating a Gist:
# 1. Go to https://gist.github.com
# 2. Paste your code
# 3. Add filename and description
# 4. Choose Public or Secret
# 5. Create Gist

# Example Gist: How to use Git commands

# Filename: git-cheatsheet.md
# Description: Quick Git commands reference

\'\'\`bash
git init              # Initialize repo
git add .            # Stage files
git commit -m "msg"  # Commit
git push             # Upload
git pull             # Download
\'\'\`

# Your Gist is now at: https://gist.github.com/username/abc123
# Others can view, clone, or comment`,
    notes: [
      'Gists are perfect for sharing snippets quickly',
      'Public Gists are searchable and indexed',
      'Secret Gists are not indexed but not private',
      'Each Gist has its own Git repository'
    ],
    practice: {
      title: 'Create a GitHub Gist (GitHub Required)',
      description: 'Share a code snippet using GitHub Gist.',
      hint: 'Go to gist.github.com → paste code → create gist',
      solution: 'Visit https://gist.github.com, paste your code, add filename, and click Create.'
    }
  },

  {
    id: 'github-copilot-intro',
    category: 'GitHub Features',
    title: 'GitHub Copilot - AI Code Assistant',
    difficulty: 'Intermediate',
    theory: [
      'GitHub Copilot is an AI that suggests code as you type. It uses machine learning trained on public repositories to predict what code you want to write. It\'s like having a pair programmer.',
      'Copilot helps with boilerplate, suggests functions, and speeds up repetitive work. But always review its suggestions — it can be wrong or insecure.',
      'Priya uses Copilot to generate form validation code quickly. She types a comment describing what she wants, and Copilot suggests working code that she reviews and uses.'
    ],
    code: `# GitHub Copilot works in VS Code (with extension installed)

# Example: Copilot suggests code
# You type a comment:
// Function to validate email address

# Copilot suggests:
function validateEmail(email) {
  const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return re.test(email);
}

# You review and accept or modify the suggestion

# Another example:
// Sort array of objects by date property

# Copilot suggests:
items.sort((a, b) => new Date(a.date) - new Date(b.date));`,
    notes: [
      'Copilot is a productivity tool; review all suggestions',
      'Can have bugs or security issues; don\'t blindly accept',
      'Paid subscription (vs. free for GitHub students)',
      'Complements your skills; not a replacement'
    ],
    practice: {
      title: 'Learn About GitHub Copilot (Conceptual)',
      description: 'Understand Copilot\'s purpose and limitations.',
      hint: 'Copilot is an AI code assistant; write comments and it suggests code',
      solution: 'GitHub Copilot uses AI to suggest code. Install the extension in VS Code, write a comment describing what you want, and Copilot suggests code to implement it.'
    }
  },

  {
    id: 'github-projects-board',
    category: 'GitHub Features',
    title: 'GitHub Projects Board - Organize Work',
    difficulty: 'Intermediate',
    theory: [
      'GitHub Projects is a Kanban board for organizing issues and PRs. You create columns (To Do, In Progress, Done) and drag issues between them. It\'s like Trello integrated with GitHub.',
      'Organize team work, track progress, and see who is working on what. Connect issues to features, assign to team members, and update status as work progresses.',
      'Priya and Arjun create a Projects board for their school project with columns: Backlog, In Progress, Code Review, Done. They move issues across columns as they work on them.'
    ],
    code: `# GitHub Projects workflow:
# 1. On your repo, go to Projects tab
# 2. Click "New project"
# 3. Choose Kanban template
# 4. Create columns: To Do, In Progress, Done
# 5. Add issues to "To Do"
# 6. As you work, drag issues across columns
# 7. Use automation: automatically move to Done when PR merges

# Example board:

# To Do:
# [ ] Add dark mode
# [ ] Fix mobile nav
# [ ] Update README

# In Progress:
# [ ] Add dark mode (assigned to Priya)

# Done:
# [ ] Add responsive design
# [ ] Setup GitHub Pages`,
    notes: [
      'Projects provide visibility into team progress',
      'Can automate column movement with GitHub Actions',
      'Works with Issues and Pull Requests',
      'Great for small teams (3-10 people)'
    ],
    practice: {
      title: 'Create a Projects Board (GitHub Required)',
      description: 'Set up a Kanban board for tracking work.',
      hint: 'Projects tab → New project → Kanban template → add columns',
      solution: 'Go to your repo\'s Projects tab → Create new project → Select Kanban template → Add To Do, In Progress, Done columns → Add issues.'
    }
  }
];
