import { TutorialTopic } from './types';

export const linuxTopics: TutorialTopic[] = [
  {
    id: 'linux-why-shell',
    category: 'Introduction',
    title: 'Why Linux & the Shell?',
    difficulty: 'Beginner',
    theory: [
      'Linux is a free, open-source operating system that powers servers, supercomputers, smartphones (Android), and embedded devices worldwide. Unlike Windows or macOS, Linux gives you complete control over your system—you can see and modify the source code, and the shell (command-line interface) is your direct gateway to this power. The shell lets you automate repetitive tasks, manage systems efficiently, and develop software with unparalleled flexibility.',
      'The shell is a command interpreter that reads your input, finds and runs programs, and displays output. When you type a command like `ls`, the shell searches for a program called `ls`, executes it, and prints the results. Most modern Linux distributions use Bash (Bourne Again Shell) by default, though others like Zsh and Fish exist. Learning the shell transforms you from a GUI-dependent user into a power user who can accomplish in seconds what might take minutes with a mouse.'
    ],
    code: `uname -a
whoami
date`,
    output: 'Linux your-machine 5.15.0... (example)\nyour-username\nFri Jan 12 10:30:45 UTC 2026',
    notes: [
      'The shell prompt typically ends with $ for regular users and # for root (superuser).',
      'Commands are case-sensitive; "ls" and "LS" are different.'
    ],
    xp: 10,
    practice: {
      title: 'Your First Shell Commands',
      description: 'Run three commands to check your system: uname -a to see OS info, whoami to verify your username, and date to show the current time.',
      startCode: '# Type your commands here\n',
      hint: 'Remember: each command on its own line, press Enter to execute.',
      solution: `uname -a
whoami
date`,
      expectedOutput: 'Linux kernel version, your username, and current date/time'
    }
  },
  {
    id: 'linux-navigate-filesystem',
    category: 'Filesystem',
    title: 'Navigating the Filesystem',
    difficulty: 'Beginner',
    theory: [
      'Linux filesystems are organized in a tree structure starting from the root directory (/). Paths can be absolute (starting with /) like /home/user/Documents, or relative (from your current location) like Documents. The home directory (~) is your personal folder where user files live. Commands like pwd, ls, and cd form the foundation of filesystem navigation.',
      'pwd (print working directory) shows where you are right now. ls lists files and folders (ls -la for detailed info including hidden files). cd changes your location; cd ~ goes home, cd .. goes up one level, and cd - returns to the previous directory. Understanding absolute vs. relative paths is essential for efficient navigation.'
    ],
    code: `pwd
ls -la
cd ~
ls
cd ..
pwd`,
    output: '/home/user\ntotal 48\ndrwxr-xr-x 10 user user 4096 Jan 12 10:30 .\n...(more files)',
    notes: [
      'Hidden files start with a dot (.). Use ls -la to see them.',
      'The tilde (~) is a shortcut for your home directory.'
    ],
    xp: 10,
    practice: {
      title: 'Explore Your Directory Structure',
      description: 'Navigate from your home directory to the parent directory, list its contents, and return to home. Use pwd to verify your location at each step.',
      startCode: '# Start here\ncd ~\n',
      hint: 'Use pwd to check where you are, ls to see files, and cd .. to go up.',
      solution: `cd ~
pwd
cd ..
ls -la
cd ~
pwd`,
      expectedOutput: 'Directory paths and file listings at each location'
    }
  },
  {
    id: 'linux-files-directories',
    category: 'Filesystem',
    title: 'Working with Files & Directories',
    difficulty: 'Beginner',
    theory: [
      'Creating and managing files/folders is fundamental. mkdir creates directories, touch creates empty files (or updates timestamps), cp copies files/folders, mv moves/renames them, and rm deletes them. The -r flag (recursive) is needed when operating on directories. Be careful with rm—it does not use a trash bin; deleted files are gone permanently.',
      'Efficient file organization saves time. Create project directories with mkdir -p path/to/nested/folder to create all parent directories. Use mv to rename: mv oldname.txt newname.txt. Copy with cp source dest. To remove a directory and all contents, use rm -rf (use carefully!). Always double-check rm commands before pressing Enter.'
    ],
    code: `mkdir my_project
touch my_project/file.txt
cp my_project/file.txt my_project/backup.txt
mv my_project/backup.txt my_project/file_backup.txt
ls -la my_project/
rm my_project/file_backup.txt`,
    output: 'my_project/ created\nfile.txt created\nfile.txt and backup.txt listed\nfile_backup.txt renamed\nDirectory listing with updated files',
    notes: [
      'Use rm -i for interactive mode (asks before deleting).',
      'mkdir -p creates nested directories without error if they exist.'
    ],
    xp: 12,
    practice: {
      title: 'Create and Manage a Project Folder',
      description: 'Create a folder called "my_app", add two files inside, copy one, rename the copy, and list the directory contents.',
      startCode: '# Create your project structure\n',
      hint: 'mkdir for folder, touch for files, cp to copy, mv to rename, ls to verify.',
      solution: `mkdir my_app
touch my_app/main.js
touch my_app/config.json
cp my_app/main.js my_app/main_backup.js
mv my_app/main_backup.js my_app/main.bak
ls -la my_app/`,
      expectedOutput: 'my_app/ directory with main.js, config.json, and main.bak files'
    }
  },
  {
    id: 'linux-view-edit-text',
    category: 'Text Processing',
    title: 'Viewing & Editing Text Files',
    difficulty: 'Beginner',
    theory: [
      'cat displays entire file contents (good for small files). less allows scrolling through large files with keyboard navigation (q to quit, space/b to move pages). head shows the first 10 lines by default (head -n 5 for custom count). tail shows the last 10 lines and is useful for monitoring logs in real-time with tail -f. nano is a beginner-friendly text editor: type normally, use Ctrl+O to save, Ctrl+X to exit.',
      'For quick viewing: cat file.txt. For large files or logs: less file.txt or tail -f logfile.log. nano is perfect for editing config files; vi/vim are advanced editors offering powerful features but steeper learning curves. Always verify file contents with cat or head before editing to avoid mistakes.'
    ],
    code: `echo "Hello, World!" > greeting.txt
cat greeting.txt
head -n 1 greeting.txt
tail -n 1 greeting.txt
# For nano: nano greeting.txt (interactive, Ctrl+X to exit)`,
    output: 'greeting.txt created and displayed\nFirst line: Hello, World!\nLast line: Hello, World!',
    notes: [
      'tail -f continuously monitors log files (Ctrl+C to stop).',
      'Use head/tail for quick peeks without loading entire files.'
    ],
    xp: 10,
    practice: {
      title: 'Create and View a Text File',
      description: 'Create a file with multiple lines of text, view the entire content, then show only the first and last lines.',
      startCode: `# Create a file with content
echo "Line 1" > myfile.txt
echo "Line 2" >> myfile.txt
echo "Line 3" >> myfile.txt
`,
      hint: 'Use cat to view all, head -n for first N lines, tail -n for last N lines.',
      solution: `echo "Line 1" > myfile.txt
echo "Line 2" >> myfile.txt
echo "Line 3" >> myfile.txt
cat myfile.txt
head -n 1 myfile.txt
tail -n 1 myfile.txt`,
      expectedOutput: 'All three lines displayed, then first line, then last line shown separately'
    }
  },
  {
    id: 'linux-permissions-ownership',
    category: 'Security',
    title: 'Permissions & Ownership',
    difficulty: 'Intermediate',
    theory: [
      'Every file has permissions controlling who can read (r=4), write (w=2), or execute (x=1) it. Permissions are represented as rwx for owner, group, and others (e.g., 755 means owner can do anything, group and others can only read/execute). ls -l shows permissions as a 10-character string: - for file (or d for directory), then three sets of rwx. chmod changes permissions; chown changes ownership. Understanding permissions is crucial for security.',
      'chmod 755 file.txt sets owner to full access (7=read+write+execute), group and others to read+execute. chmod +x script.sh adds execute permission. chmod -w file.txt removes write. chown user:group file.txt changes owner and group. Always verify permissions with ls -l before and after to ensure changes took effect correctly.'
    ],
    code: `touch script.sh
ls -l script.sh
chmod +x script.sh
ls -l script.sh
chmod 644 script.sh
ls -l script.sh`,
    output: '-rw-r--r-- 1 user user 0 Jan 12 10:30 script.sh\n-rwxr-xr-x 1 user user 0 Jan 12 10:30 script.sh (after chmod +x)\n-rw-r--r-- 1 user user 0 Jan 12 10:30 script.sh (after chmod 644)',
    notes: [
      'chmod 777 is dangerous (everyone can read, write, execute). Avoid it.',
      'Use chmod u+x to add execute for owner only, more readable than numeric.'
    ],
    xp: 15,
    practice: {
      title: 'Modify File Permissions',
      description: 'Create a file, check its initial permissions, add execute permission, then restrict to owner-read-only (400).',
      startCode: '# Create and check file permissions\ntouch test_file.txt\n',
      hint: 'Use chmod +x, then chmod 400. Verify each step with ls -l.',
      solution: `touch test_file.txt
ls -l test_file.txt
chmod +x test_file.txt
ls -l test_file.txt
chmod 400 test_file.txt
ls -l test_file.txt`,
      expectedOutput: 'Permissions changing from -rw-r--r-- to -rwxr-xr-x to -r--------'
    }
  },
  {
    id: 'linux-pipes-redirection-grep',
    category: 'Text Processing',
    title: 'Pipes, Redirection & grep',
    difficulty: 'Intermediate',
    theory: [
      'Redirection allows you to send output to files or read input from them. > writes output to a file (overwriting), >> appends to a file. < reads input from a file. Pipes (|) connect commands: the output of one becomes input to the next. This is Unix\'s superpower—small, focused tools chained together solve complex tasks.',
      'grep searches text for patterns. grep "keyword" file.txt finds lines containing "keyword". grep -i ignores case, grep -n shows line numbers, grep -c counts matches. Combine grep with pipes: cat file.txt | grep "pattern" | wc -l counts matching lines. Example: ps aux | grep python finds all python processes. Redirection and pipes are essential for scripting and data processing.'
    ],
    code: `echo "apple" > fruits.txt
echo "banana" >> fruits.txt
echo "apricot" >> fruits.txt
cat fruits.txt
cat fruits.txt | grep "a"
grep -n "ap" fruits.txt
cat fruits.txt | grep "a" | wc -l`,
    output: 'fruits.txt created with three items\napple, apricot (grep result)\n1:apple 3:apricot (with line numbers)\n2 (count of lines with "a")',
    notes: [
      'grep is case-sensitive by default; use -i for case-insensitive search.',
      'Pipes are powerful but can be chained too far—keep commands readable.'
    ],
    xp: 15,
    practice: {
      title: 'Search and Filter Data',
      description: 'Create a file with names (e.g., Alice, Bob, Anna), search for names starting with "A", count results, and save matches to a new file.',
      startCode: `# Create a names file
echo "Alice" > names.txt
echo "Bob" >> names.txt
echo "Anna" >> names.txt
`,
      hint: 'Use grep with pattern, pipe to wc -l for count, and > to save results.',
      solution: `echo "Alice" > names.txt
echo "Bob" >> names.txt
echo "Anna" >> names.txt
grep "^A" names.txt
grep "^A" names.txt | wc -l
grep "^A" names.txt > a_names.txt
cat a_names.txt`,
      expectedOutput: 'Alice and Anna matched, count is 2, results saved to a_names.txt'
    }
  },
  {
    id: 'linux-processes-system',
    category: 'System',
    title: 'Processes & System Resources',
    difficulty: 'Intermediate',
    theory: [
      'Processes are running programs. ps lists processes; ps aux shows all processes with detailed info (user, CPU, memory). top displays live resource usage—CPU, memory, running processes—updated in real time (q to quit). kill terminates a process: kill PID (gracefully) or kill -9 PID (forcefully). df shows disk space usage, du estimates directory sizes. Understanding process management is critical for system administration.',
      'ps aux | grep name finds specific processes. kill %1 terminates job 1. bg and fg control background/foreground jobs. A process consuming too much memory or CPU can be identified via top and stopped with kill. df -h shows human-readable sizes (KB, MB, GB). These tools help troubleshoot performance issues and manage system resources efficiently.'
    ],
    code: `ps aux | head -n 5
top -bn1 | head -n 10
df -h
du -sh ~`,
    output: 'First 5 processes displayed\nCPU and memory stats\nDisk usage by partition\nTotal size of home directory',
    notes: [
      'kill -9 is forceful and can cause data loss; use kill without -9 first.',
      'top is interactive; press q to exit, 1 to show per-CPU stats.'
    ],
    xp: 15,
    practice: {
      title: 'Monitor System Resources',
      description: 'Start a long-running process in the background, find its PID using ps, check memory usage with top, and terminate it.',
      startCode: `# Start a background process
sleep 600 &
`,
      hint: 'Use ps aux to find the sleep process PID, kill PID to stop it.',
      solution: `sleep 600 &
ps aux | grep sleep
# Note the PID, then:
kill PID`,
      expectedOutput: 'sleep process running in background, PID shown, process terminated successfully'
    }
  },
  {
    id: 'linux-package-management-sudo',
    category: 'System Administration',
    title: 'Package Management & sudo',
    difficulty: 'Intermediate',
    theory: [
      'sudo (substitute user, do) runs commands with elevated privileges (as root/superuser). This is essential for system tasks like installing software. apt (Advanced Package Tool) is Debian/Ubuntu\'s package manager. apt update refreshes package lists, apt install package-name installs software, apt remove removes it, apt upgrade updates all packages. Never run everything as sudo—only commands that truly need it (system changes, not user work).',
      'sudo apt install curl downloads and installs curl. You may be prompted for your password. apt search keyword finds packages. apt show package-name displays details. Behind the scenes, apt manages dependencies automatically. Always run sudo apt update before installing new packages to ensure you get current versions. Misuse of sudo and rogue package installations are common security risks—only install from trusted sources.'
    ],
    code: `sudo apt update
apt search curl
apt show curl
# sudo apt install curl (example, don\'t run without approval)
apt list --installed | grep vim`,
    output: 'Package lists updated\nSearch results for curl-related packages\nDetails of curl package\nInstalled packages containing "vim"',
    notes: [
      'Always run sudo apt update before sudo apt install.',
      'apt install asks for confirmation; press y to proceed.'
    ],
    xp: 12,
    practice: {
      title: 'Search and Understand Packages',
      description: 'Search for a package called "git", display its details, and list currently installed packages to see what\'s already on your system.',
      startCode: `# Search for packages
apt search git | head -n 10
`,
      hint: 'Use apt show to see package details, apt list --installed to see what\'s installed.',
      solution: `apt search git | head -n 10
apt show git
apt list --installed | head -n 20`,
      expectedOutput: 'Git package search results, package details, and sample of installed packages'
    }
  },
  {
    id: 'linux-shell-scripting-basics',
    category: 'Scripting',
    title: 'Shell Scripting Basics',
    difficulty: 'Intermediate',
    theory: [
      'A shell script is a text file containing shell commands executed sequentially. Scripts start with #!/bin/bash (shebang), declaring the interpreter. Variables store values: NAME="value". Use $\{NAME\} to access them. Conditionals (if/else) control flow. Loops (for, while) repeat actions. Scripts must have execute permission (chmod +x script.sh) to run directly. This enables automation—backups, deployments, batch processing—without typing commands repeatedly.',
      'Example: #!/bin/bash\\necho "Hello $\{name\}"\\nfor i in 1 2 3; do echo "Count: $\${i}"; done. if [ -f file.txt ]; then processes file conditionally. [ $\${var\} -eq 5 ] tests equality. Scripts can accept arguments ($1, $2, $3...). Learning scripting transforms you from a shell user to a system automation expert.'
    ],
    code: `cat > hello.sh << 'EOF'
#!/bin/bash
echo "Enter your name:"
read name
echo "Hello, \${name}!"
for i in 1 2 3; do
  echo "Count: \${i}"
done
EOF
chmod +x hello.sh
./hello.sh`,
    output: 'Script created, made executable, and run (prompts for input, displays greetings and count)',
    notes: [
      'Use \` (backtick) or $(...) to capture command output: result=\$(date).',
      'Test scripts with bash script.sh before making them executable.'
    ],
    xp: 18,
    practice: {
      title: 'Write Your First Script',
      description: 'Create a shell script that takes a filename as argument, checks if it exists, and displays its size using ls -lh.',
      startCode: `cat > check_file.sh << 'EOF'
#!/bin/bash
# Your script here
EOF
`,
      hint: 'Use $1 for first argument, [ -f $1 ] to check if file exists, ls -lh $1 to show size.',
      solution: `cat > check_file.sh << 'EOF'
#!/bin/bash
if [ -f "\${1}" ]; then
  echo "File exists:"
  ls -lh "\${1}"
else
  echo "File not found: \${1}"
fi
EOF
chmod +x check_file.sh
./check_file.sh test.txt`,
      expectedOutput: 'File existence checked, size and details displayed or "not found" message shown'
    }
  },
  {
    id: 'linux-ssh-tips-project',
    category: 'Advanced',
    title: 'SSH, Tips & Mini Project',
    difficulty: 'Advanced',
    theory: [
      'SSH (Secure Shell) allows secure remote access to servers. ssh user@hostname connects to a remote machine. ssh-keygen generates public/private key pairs for password-less login. Add your public key (~/.ssh/id_rsa.pub) to ~/.ssh/authorized_keys on the remote server. scp copies files: scp file user@host:/path. SSH is essential for web development, system administration, and DevOps work. Always use SSH keys instead of passwords for production.',
      'A mini project: write a backup script that: 1) creates a timestamped folder, 2) copies project files, 3) compresses into .tar.gz, 4) displays completion. Combine mkdir, cp, tar, echo into a reusable script. Deploy it via cron to run daily. This practical exercise consolidates: variables, command substitution, redirection, and scripting—everything learned so far.'
    ],
    code: `# SSH connection
# ssh user@example.com
# scp localfile.txt user@example.com:/home/user/

# Backup script example
cat > backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="backup_\$(date +%Y%m%d_%H%M%S)"
mkdir "\${BACKUP_DIR}"
cp -r ./src "./\${BACKUP_DIR}/"
tar -czf "\${BACKUP_DIR}.tar.gz" "\${BACKUP_DIR}"
rm -rf "\${BACKUP_DIR}"
echo "Backup complete: \${BACKUP_DIR}.tar.gz"
EOF
chmod +x backup.sh
./backup.sh`,
    output: 'SSH connection attempted (example)\nBackup folder created, files copied, compressed, and cleanup done. Backup file ready.',
    notes: [
      'Never share private keys (id_rsa). Protect them with chmod 600.',
      'Use ssh-copy-id to easily install public keys on remote servers.'
    ],
    xp: 20,
    practice: {
      title: 'Create a Backup & Cleanup Script',
      description: 'Write a script that creates a backup folder with today\'s date, copies files from a source directory, compresses it, deletes the original folder, and confirms completion.',
      startCode: `cat > backup_project.sh << 'EOF'
#!/bin/bash
# Your backup script here
EOF
`,
      hint: 'Use date +%Y%m%d for timestamp, mkdir, cp -r, tar -czf, rm -rf, and echo to confirm.',
      solution: `cat > backup_project.sh << 'EOF'
#!/bin/bash
DATE=\$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="backup_\${DATE}"
mkdir -p "\${BACKUP_DIR}"
cp -r ./src "./\${BACKUP_DIR}/" 2>/dev/null || echo "src not found, skipping"
tar -czf "\${BACKUP_DIR}.tar.gz" "\${BACKUP_DIR}"
rm -rf "\${BACKUP_DIR}"
echo "Backup complete: \${BACKUP_DIR}.tar.gz created"
EOF
chmod +x backup_project.sh
./backup_project.sh`,
      expectedOutput: 'Backup script creates timestamped archive and confirms success'
    }
  }
];
