import type { TutorialTopic } from './types';

export const cloudComputingTopics: TutorialTopic[] = [
  // Cloud Fundamentals (10 topics)
  {
    id: 'cloud-intro',
    category: 'Cloud Fundamentals',
    title: 'What is Cloud Computing?',
    difficulty: 'Beginner',
    theory: [
      'Cloud computing is the delivery of computing resources (servers, storage, databases, software) over the internet ("the cloud") instead of owning and maintaining physical hardware locally. Users access these services on-demand, paying only for what they use, similar to electricity consumption.',
      'The cloud model provides flexibility, scalability, and cost-efficiency. Organizations no longer need large upfront capital investments in infrastructure. Services run in data centers managed by cloud providers like AWS, Azure, and Google Cloud, accessible from anywhere globally.',
      'Cloud computing powers modern applications—from Netflix streaming to Google Drive storage to Ola booking systems in India. It enables startups to compete with large enterprises by providing enterprise-grade infrastructure without the burden of managing physical servers.'
    ],
    code: `// Example: Accessing cloud storage (AWS S3)
AWS S3 bucket stores files globally
No physical server needed at your office
Pay per GB of storage used

Real-world example:
Ola (Indian ride-hailing) uses AWS to store ride data
Swiggy uses cloud for order processing
ISRO uses Google Cloud for satellite data analysis`,
    output: 'Cloud resources accessible from any device with internet connection',
    notes: [
      'Cloud = Internet-based computing, not a physical location',
      'Pay-as-you-go model reduces infrastructure costs',
      'Automatic updates and security patches from providers'
    ],
    livePreview: false,
    practice: {
      title: 'Identify Cloud Services in Daily Life',
      description: 'List 5 cloud services you use daily (Gmail, YouTube, WhatsApp). Explain why each is cloud-based.',
      hint: 'Think of services accessed over internet without installing software',
      solution: 'Gmail (cloud email), Google Drive (cloud storage), Netflix (cloud streaming), Zomato (cloud backend), Instagram (cloud photos)'
    }
  },

  {
    id: 'cloud-history',
    category: 'Cloud Fundamentals',
    title: 'History of Cloud Computing',
    difficulty: 'Beginner',
    theory: [
      '1960s: Mainframe computing with time-sharing. Multiple users accessed one powerful computer remotely. Grid computing concepts emerged.',
      '1990s-2000s: Internet boom. Amazon Web Services (AWS) launched in 2006, revolutionizing cloud with EC2 and S3. Microsoft Azure (2010) and Google Cloud Platform (2011) followed.',
      'Today: Cloud is ubiquitous. Kubernetes, serverless, AI/ML in cloud, edge computing, and multi-cloud strategies dominate. Indian companies like Jio, Paytm, Razorpay leverage cloud for scale.'
    ],
    code: `// Timeline of Cloud Evolution
1960s: Mainframe time-sharing
1990s: Early internet hosting (Geocities)
2006: AWS launches (revolutionizes cloud)
2010: Microsoft Azure launches
2011: Google Cloud Platform launches
2015: Kubernetes open-sourced
2020: Serverless & AI/ML cloud services mainstream
2024: Multi-cloud & hybrid-cloud standard`,
    notes: [
      'AWS pioneered the modern cloud model',
      'Cloud adoption accelerated post-2010',
      'India adopted cloud rapidly (ISRO, RBI, government)'
    ],
    livePreview: false,
    practice: {
      title: 'Research Cloud in India',
      description: 'Find one Indian company using cloud (check AWS case studies). Document what they achieved.',
      hint: 'Look up: ISRO cloud, RBI cloud, Razorpay infrastructure',
      solution: 'ISRO uses AWS for satellite data processing. Razorpay uses cloud for payment processing at scale.'
    }
  },

  {
    id: 'cloud-vs-onpremise',
    category: 'Cloud Fundamentals',
    title: 'Cloud vs On-Premise Infrastructure',
    difficulty: 'Beginner',
    theory: [
      'On-Premise: Company owns and manages all servers, storage, networking hardware in their office/data center. Requires large upfront capital, IT staff, maintenance, electricity, cooling, security.',
      'Cloud: Cloud provider manages infrastructure. Company only manages applications and data. Lower upfront cost, automatic scaling, security handled by provider, accessible globally, pay-as-you-go.',
      'Trade-offs: On-premise offers full control; cloud offers flexibility and cost-efficiency. Most modern Indian startups (Ola, Swiggy, Zomato) prefer cloud. Large enterprises often use hybrid (both).'
    ],
    code: `// On-Premise vs Cloud Comparison
ON-PREMISE:
- Buy server: ₹3-5 lakhs upfront
- Monthly electricity: ₹20k-50k
- IT staff needed: ₹50k+ salary
- Maintenance: Your responsibility
- Scaling: Weeks to add capacity

CLOUD (AWS):
- EC2 instance: ₹1,500/month (pay-as-you-go)
- Electricity: Included in cloud price
- No IT staff needed
- Updates automatic
- Scaling: Minutes (auto-scaling)`,
    notes: [
      'Cloud CAPEX → OPEX shift',
      'On-premise needs physical space & security',
      'Cloud ideal for startups; hybrid for enterprises'
    ],
    livePreview: false,
    practice: {
      title: 'Cost Comparison Analysis',
      description: 'Compare 3-year cost: On-premise server vs AWS cloud. Assume 1 server needed.',
      hint: 'On-premise: hardware + power + staff. Cloud: monthly EC2 cost',
      solution: 'On-premise ≈ ₹15 lakhs. Cloud ≈ ₹5-7 lakhs. Cloud saves ₹8+ lakhs.'
    }
  },

  {
    id: 'cloud-benefits-risks',
    category: 'Cloud Fundamentals',
    title: 'Benefits and Risks of Cloud Computing',
    difficulty: 'Beginner',
    theory: [
      'Benefits: Cost-efficiency (OPEX vs CAPEX), scalability (auto-scale on demand), reliability (99.99% uptime SLA), security (enterprise-grade), global reach (data centers worldwide), automatic updates, disaster recovery built-in.',
      'Risks: Data security concerns, vendor lock-in (switching clouds is hard), compliance/regulations (DPDP Act in India), latency (internet dependency), downtime (service outages), ongoing monitoring costs.',
      'Mitigation: Choose reputable providers, encrypt sensitive data, regular backups, multi-cloud strategy, compliance audits. Indian regulations (DPDP) require data residency—AWS Mumbai, Azure Pune, GCP Delhi ensure local data storage.'
    ],
    code: `// Benefits Example: Auto-Scaling
Traffic to website spikes to 1M visitors

ON-PREMISE:
- System crashes (no spare capacity)
- Business loses ₹10+ lakhs per hour
- Takes 1 week to buy/install servers

CLOUD (AWS Auto-Scaling):
- Automatically adds 100 servers in 2 minutes
- Handles 10M visitors seamlessly
- Costs increase by ₹50k but zero downtime`,
    notes: [
      'Cloud security is shared responsibility',
      'Vendor lock-in is a real concern',
      'Indian regulations = local data storage required'
    ],
    livePreview: false,
    practice: {
      title: 'Risk Assessment',
      description: 'List 3 risks for your startup using AWS. Propose mitigation for each.',
      hint: 'Think: security, cost, reliability, compliance',
      solution: 'Risk 1: AWS outage → Multi-region failover. Risk 2: Data theft → Encryption. Risk 3: Costs spike → Budget alerts.'
    }
  },

  {
    id: 'cloud-service-models',
    category: 'Cloud Fundamentals',
    title: 'Cloud Service Models: IaaS, PaaS, SaaS',
    difficulty: 'Intermediate',
    theory: [
      'IaaS (Infrastructure-as-a-Service): You get bare metal—virtual servers, storage, networking. You manage OS, middleware, applications. Examples: AWS EC2, Azure VMs, Google Compute Engine. You have most control.',
      'PaaS (Platform-as-a-Service): Provider manages infrastructure & OS. You deploy applications on top. Examples: AWS Lambda, Azure App Service, Google Cloud Run. Faster deployment, less operational work.',
      'SaaS (Software-as-a-Service): Everything managed by provider. You just use the application via browser. Examples: Google Workspace, Microsoft 365, Salesforce, Slack. Zero infrastructure concerns.'
    ],
    code: `// Service Models Comparison

IaaS (AWS EC2):
aws ec2 run-instances --image-id ami-12345 --instance-type t2.micro
# You get: Virtual server. You manage OS, apps, updates.

PaaS (AWS Lambda):
zip function.zip lambda_function.py
aws lambda create-function --function-name hello --runtime python3.9
# You deploy code. AWS manages servers, OS, scaling.

SaaS (Google Workspace):
# Just open gmail.com
# Google manages servers, security, updates. You use email.`,
    output: 'IaaS=Most control, most work. PaaS=Balanced. SaaS=Least control, least work.',
    notes: [
      'IaaS: Highest flexibility, highest operations burden',
      'PaaS: Best for app developers',
      'SaaS: Best for end users'
    ],
    livePreview: false,
    practice: {
      title: 'Match Service Model to Use Case',
      description: 'For each scenario, choose IaaS/PaaS/SaaS: (1) Build web app, (2) Video conferencing, (3) Database server.',
      hint: 'Control vs convenience trade-off',
      solution: '(1) PaaS (AWS App Runner), (2) SaaS (Google Meet), (3) IaaS (AWS EC2 + DB) or managed (RDS)'
    }
  },

  {
    id: 'cloud-deployment-models',
    category: 'Cloud Fundamentals',
    title: 'Cloud Deployment Models: Public, Private, Hybrid',
    difficulty: 'Intermediate',
    theory: [
      'Public Cloud: Infrastructure shared among multiple organizations. AWS, Azure, GCP are public clouds. Cost-effective, scalable, secure (SOC 2 certified), ideal for startups and non-sensitive workloads.',
      'Private Cloud: Infrastructure dedicated to one organization (on-premise or hosted). Full control, compliance-friendly, expensive, requires IT team. Used by banks, government, healthcare for sensitive data.',
      'Hybrid Cloud: Mix of public + private. Sensitive data in private cloud, non-sensitive in public cloud. Popular in India—RBI, government use hybrid for compliance with DPDP Act and data residency requirements.'
    ],
    code: `// Deployment Models in Practice

PUBLIC CLOUD (Ola, Swiggy, Zomato):
- All infrastructure in AWS/Azure/GCP
- Share resources with other companies (secure isolation)
- No upfront investment
- Auto-scaling for traffic spikes

PRIVATE CLOUD (RBI, Government, ICICI Bank):
- Own data center or hosted private cloud
- Full control, no resource sharing
- Higher cost, more security
- Compliance with DPDP Act

HYBRID (NPCI, Large enterprises):
- Payments: Private cloud (sensitive)
- Analytics: Public cloud (cheaper scale)
- Best of both worlds`,
    notes: [
      'Public = cheapest, public cloud providers',
      'Private = costly but compliant',
      'Hybrid = increasingly popular in India'
    ],
    livePreview: false,
    practice: {
      title: 'Choose Deployment Model',
      description: 'Your fintech app in India handles customer bank data. Which deployment? Why?',
      hint: 'DPDP Act, RBI guidelines, compliance',
      solution: 'Hybrid: Private cloud for payment data (DPDP compliance), public cloud for analytics. Or private cloud only + comply with RBI data residency rules.'
    }
  },

  {
    id: 'cloud-providers-overview',
    category: 'Cloud Fundamentals',
    title: 'Cloud Providers Overview: AWS, Azure, GCP',
    difficulty: 'Beginner',
    theory: [
      'AWS (Amazon Web Services): Market leader, 35% market share. Largest data center presence globally. Regions: Mumbai (ap-south-1), Hyderabad (ap-south-2). Services: EC2, S3, RDS, Lambda, and 200+ more. Used by Flipkart, AWS India offices in Bangalore.',
      'Microsoft Azure: 2nd largest, 23% market share. Strong in enterprise. Regions: Pune (central), Jaipur (south), Delhi (north). Services: Azure VMs, App Service, Cosmos DB, Azure DevOps. Used by Indian banks, government.',
      'Google Cloud Platform (GCP): 3rd largest, 11% market share. Strong in data, AI, ML. Regions: Delhi, Mumbai, Bangalore. Services: Compute Engine, Cloud Storage, BigQuery, Vertex AI. Used by Jio, ISRO, Indian startups.'
    ],
    code: `// Cloud Provider Regions in India

AWS India:
- Mumbai (ap-south-1): Cheapest, lowest latency
- Hyderabad (ap-south-2): New, premium pricing

Azure India:
- Pune, Jaipur, Delhi: Sovereign cloud option
- Government compliance

GCP India:
- Delhi, Mumbai, Bangalore: Growing presence
- Strong for analytics & AI

# AWS CLI to check Mumbai region
aws ec2 describe-regions --region ap-south-1`,
    notes: [
      'AWS = most mature, largest ecosystem',
      'Azure = strong in enterprise, Microsoft integration',
      'GCP = best for data science, AI/ML'
    ],
    livePreview: false,
    practice: {
      title: 'Choose Your Cloud Provider',
      description: 'You need to launch a webapp in India with low latency. Compare pricing and regions for each provider.',
      hint: 'Check pricing calculator for 1 small server',
      solution: 'AWS Mumbai cheapest (~₹1,500/month). Azure/GCP comparable. Choose AWS if cost matters, Azure if you use Windows/.NET.'
    }
  },

  {
    id: 'virtualization-basics',
    category: 'Cloud Fundamentals',
    title: 'Virtualization Basics',
    difficulty: 'Intermediate',
    theory: [
      'Virtualization allows one physical server to run multiple virtual servers (VMs) using a hypervisor (software layer). Each VM has its own OS, applications, storage—isolated from others. Enables cloud computing economics.',
      'Hypervisors: Type 1 (bare-metal): Hyper-V, ESXi, KVM run directly on hardware. Type 2 (hosted): VirtualBox, VMware Workstation run on OS. Cloud providers use Type 1 for efficiency.',
      'Benefits: Server consolidation (10 VMs on 1 physical server = 90% cost savings), isolation (one VM crash doesn\'t affect others), easy backups/migration, disaster recovery. AWS EC2 instances are VMs.'
    ],
    code: `// Virtualization in Cloud

Physical Server (₹5 lakh hardware)
│
├─ Hypervisor (KVM/ESXi)
│
├─ VM1: Linux + Apache (₹1,500/month)
├─ VM2: Windows + SQL Server (₹2,000/month)
├─ VM3: Linux + Node.js (₹1,200/month)
└─ VM4: Ubuntu + PostgreSQL (₹1,500/month)

# Total: Physical server amortized + ₹5,200/month
# Instead of: 4 physical servers ₹20 lakh + maintenance

# AWS: Launch VM in seconds
aws ec2 run-instances --image-id ami-abc123 --instance-type t2.micro`,
    notes: [
      'Virtualization = foundation of cloud',
      'Hypervisor manages VM isolation',
      'Enables efficient resource sharing'
    ],
    livePreview: false,
    practice: {
      title: 'Hypervisor Concept',
      description: 'Explain: 1 physical server (16GB RAM) running 4 VMs (4GB each). How does hypervisor manage this?',
      hint: 'Resource scheduling, isolation, memory management',
      solution: 'Hypervisor allocates 4GB to each VM, schedules CPU time fairly. VMs see 4GB but share physical 16GB. Isolation ensures one VM can\'t crash others.'
    }
  },

  {
    id: 'containers-intro',
    category: 'Cloud Fundamentals',
    title: 'Introduction to Containers and Docker',
    difficulty: 'Intermediate',
    theory: [
      'Containers are lightweight, isolated environments bundling application code, libraries, and dependencies. Unlike VMs (which need full OS, GBs in size), containers are minimal (MBs). Docker is the most popular container platform.',
      'Containers share the host OS kernel but isolate user space. One server runs 100+ containers vs 10 VMs. Benefits: fast startup (seconds vs minutes), efficient resource use, consistency across environments (dev=prod).',
      'Docker workflow: Write Dockerfile (recipe) → Build image (blueprint) → Run container (instance). Used by Ola, Swiggy, Paytm for microservices. Kubernetes orchestrates containers at scale.'
    ],
    code: `# Docker Example: Node.js App

# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "app.js"]
EXPOSE 3000

# Build
docker build -t myapp:1.0 .

# Run
docker run -p 3000:3000 myapp:1.0

# Check
curl http://localhost:3000`,
    output: 'Container starts in 1-2 seconds. Lightweight, portable, reproducible.',
    notes: [
      'Container = lighter weight than VM',
      'Dockerfile = Infrastructure as Code',
      'Docker = standard container runtime'
    ],
    livePreview: false,
    practice: {
      title: 'Create a Dockerfile',
      description: 'Write a Dockerfile for a Python Flask app that listens on port 5000.',
      hint: 'FROM python:3.9, WORKDIR, COPY, RUN pip, CMD flask run',
      solution: 'FROM python:3.9\nWORKDIR /app\nCOPY . .\nRUN pip install -r requirements.txt\nCMD ["flask", "run"]'
    }
  },

  {
    id: 'cloud-india-regions',
    category: 'Cloud Fundamentals',
    title: 'Cloud in India: AWS Mumbai, Azure Pune, GCP Delhi',
    difficulty: 'Beginner',
    theory: [
      'India has massive cloud presence. AWS has 2 regions: Mumbai (ap-south-1, largest) and Hyderabad (ap-south-2, new). Azure has 3 regions: Pune (central India), Delhi (north), Jaipur (south). GCP has regions in Delhi, Mumbai, Bangalore.',
      'DPDP Act (India): Requires personal data storage in India. AWS Mumbai, Azure Pune, GCP Delhi comply. Ensures data sovereignty and low latency for Indian users. Government mandates local processing.',
      'Indian companies advantage: Ola, Swiggy, Zomato use Mumbai/Pune for local scale. Jio uses GCP. RBI, government use sovereign cloud options. Latency from India to Mumbai = 2-5ms vs 60-100ms to Singapore.'
    ],
    code: `# AWS India Regions & Pricing

AWS Mumbai (ap-south-1):
- t2.micro: ₹740/month
- Cheapest & lowest latency for India
- Used by: Flipkart, Ola

AWS Hyderabad (ap-south-2):
- t2.micro: ₹1,000/month
- New, premium pricing
- Premium SLA

# Check pricing
aws ec2 describe-instance-types --region ap-south-1

# Azure Pune (centralindia):
az vm create --location centralindia --image UbuntuLTS

# GCP Delhi:
gcloud compute instances create my-vm --zone asia-south1-a`,
    notes: [
      'Mumbai = cheapest, most mature India region',
      'DPDP Act requires local data storage',
      'Latency matters for real-time apps (Ola rides, Swiggy orders)'
    ],
    livePreview: false,
    practice: {
      title: 'Compare Regions',
      description: 'You\'re launching an app for Indian users. Compare latency: Mumbai vs Singapore region. Why choose Mumbai?',
      hint: 'DPDP compliance + latency + cost',
      solution: 'Mumbai: 2-5ms latency, DPDP compliant, ₹740. Singapore: 60ms latency, non-compliant. Mumbai is clear choice.'
    }
  },

  // AWS Basics (10 topics)
  {
    id: 'aws-overview',
    category: 'AWS Basics',
    title: 'AWS Overview and Key Services',
    difficulty: 'Beginner',
    theory: [
      'AWS (Amazon Web Services) is the market leader with 200+ services. Core services: EC2 (servers), S3 (storage), RDS (databases), Lambda (serverless), IAM (security). Launched 2006, pioneered modern cloud.',
      'AWS regions worldwide with India focus: Mumbai (ap-south-1) is primary, Hyderabad (ap-south-2) is secondary. Free Tier offers 12 months free access to core services for new users. Used by 1M+ customers globally, 50%+ startups in India.',
      'Pricing: Pay-as-you-go, no upfront cost, no long-term contracts. Reserved instances 40% cheaper for 1-3 year commitments. Spot instances 70% cheaper for flexible workloads. Savings Plans for compute flexibility.'
    ],
    code: `# AWS Key Services

COMPUTE:
- EC2: Virtual servers (pay per hour)
- Lambda: Serverless (pay per execution)
- Elastic Beanstalk: Managed app deployment

STORAGE:
- S3: Object storage (images, videos, files)
- EBS: Block storage (like hard drive)
- Glacier: Archive storage (cheap, slow)

DATABASE:
- RDS: Managed relational (MySQL, PostgreSQL)
- DynamoDB: NoSQL database
- ElastiCache: In-memory cache

NETWORKING:
- VPC: Virtual network isolation
- Route53: Domain name service (DNS)
- CloudFront: Content delivery (CDN)

# Check AWS status
aws ec2 describe-instances --region ap-south-1`,
    notes: [
      'EC2 = most popular, like renting a server',
      'S3 = most used, 100 trillion objects stored',
      'Lambda = future of computing (serverless)'
    ],
    livePreview: false,
    practice: {
      title: 'Design AWS Architecture',
      description: 'Sketch components for a photo-sharing app: where store photos, where run code, how serve to users globally?',
      hint: 'S3 (storage), EC2/Lambda (code), CloudFront (CDN), RDS (metadata)',
      solution: 'S3 stores photos (cheap, durable). Lambda processes uploads. RDS stores metadata. CloudFront caches images globally. Route53 for domain.'
    }
  },

  {
    id: 'aws-ec2',
    category: 'AWS Basics',
    title: 'EC2: Virtual Servers on AWS',
    difficulty: 'Intermediate',
    theory: [
      'EC2 (Elastic Compute Cloud) is AWS\'s virtual server service. You choose: OS (Amazon Linux, Ubuntu, Windows), instance type (t2.micro for small, c5.large for compute), storage (EBS volume). Pay per hour of usage.',
      'Instance types: t2 (burstable, cheap, suitable for dev/small apps), m5 (general purpose, balanced CPU/RAM), c5 (compute optimized, for processing), r5 (memory optimized, for databases). t2.micro = 0.5 vCPU, 1GB RAM, ₹740/month in Mumbai.',
      'Security: Security Groups (firewall rules), IAM roles (permissions), Key Pairs (SSH login). Always use security best practices: restrict port 22 (SSH) to your IP, use strong key pairs, enable VPC isolation.'
    ],
    code: `# Launch EC2 instance in Mumbai

# Create key pair
aws ec2 create-key-pair --key-name mykey --region ap-south-1 --query 'KeyMaterial' > mykey.pem
chmod 400 mykey.pem

# Launch instance
aws ec2 run-instances \\
  --image-id ami-0a7cf821b91bcccbc \\
  --instance-type t2.micro \\
  --key-name mykey \\
  --security-groups my-web-sg \\
  --region ap-south-1

# Get instance details
aws ec2 describe-instances --region ap-south-1

# SSH into instance
ssh -i mykey.pem ec2-user@<public-ip>

# Stop instance (save money)
aws ec2 stop-instances --instance-ids i-1234567890abcdef0 --region ap-south-1`,
    output: 'Instance launches in 2-3 minutes. Accessible via SSH or RDP based on OS.',
    notes: [
      't2.micro = Free Tier eligible (1 year)',
      'Security Group = instance firewall',
      'Key Pair = SSH authentication (never lose it)'
    ],
    livePreview: false,
    practice: {
      title: 'Launch & SSH into EC2',
      description: 'Launch t2.micro Ubuntu in Mumbai. SSH in and run: echo "Hello Cloud"',
      hint: 'Create key pair, security group, run instance, SSH',
      solution: 'Create key pair → Create sg (allow port 22) → run-instances → wait 2min → ssh -i key.pem ubuntu@ip'
    }
  },

  {
    id: 'aws-s3',
    category: 'AWS Basics',
    title: 'S3: Object Storage on AWS',
    difficulty: 'Intermediate',
    theory: [
      'S3 (Simple Storage Service) is AWS\'s object storage. Store unlimited files (objects) organized in buckets (folders). Durability: 99.999999999% (11 nines), built-in replication, automatic backups. Cost: ₹1.4 per GB/month in Mumbai.',
      'Use cases: Website assets (CSS, JS, images), backups, log files, video storage (YouTube uses S3), data lakes for analytics. Not for databases or OS installation (use EBS for that).',
      'Access control: Bucket policies (who can access), ACLs (public/private), pre-signed URLs (temporary links), IAM roles (service access). Security: encryption at rest (default) and in transit (HTTPS).'
    ],
    code: `# S3 Operations

# Create bucket
aws s3 mb s3://my-bucket-2024 --region ap-south-1

# Upload file
aws s3 cp photo.jpg s3://my-bucket-2024/photos/

# Upload folder recursively
aws s3 cp ./backup/ s3://my-bucket-2024/backup/ --recursive

# List bucket contents
aws s3 ls s3://my-bucket-2024/ --recursive

# Download file
aws s3 cp s3://my-bucket-2024/photo.jpg ./

# Make object public (generate URL)
aws s3api put-object-acl --bucket my-bucket-2024 --key photo.jpg --acl public-read

# Generate pre-signed URL (temporary access)
aws s3 presign s3://my-bucket-2024/video.mp4 --expires-in 3600

# Delete object
aws s3 rm s3://my-bucket-2024/photo.jpg

# Delete bucket
aws s3 rb s3://my-bucket-2024 --force`,
    output: 'Objects accessible via HTTPS URL. Storage billed per GB.',
    notes: [
      'Bucket names must be globally unique',
      'Objects stored with key (path/filename)',
      'Highly durable, perfect for backups'
    ],
    livePreview: false,
    practice: {
      title: 'Upload & Share File via S3',
      description: 'Create S3 bucket, upload a text file, generate public URL, share with friend.',
      hint: 'Create bucket → cp file → put-object-acl public → presign or public URL',
      solution: 'mb s3://mybucket → cp file.txt s3://mybucket → put-object-acl public → share https://mybucket.s3.amazonaws.com/file.txt'
    }
  },

  {
    id: 'aws-rds',
    category: 'AWS Basics',
    title: 'RDS: Managed Databases on AWS',
    difficulty: 'Intermediate',
    theory: [
      'RDS (Relational Database Service) is AWS\'s managed database. Choose engine: MySQL, PostgreSQL, MariaDB, Oracle, SQL Server. AWS handles backups, patches, replication, failover. You focus on queries.',
      'No need to manage OS, install DB, configure backups. Automatic daily backups (35-day retention), multi-AZ failover (99.95% SLA), read replicas for scaling read-heavy workloads.',
      'Cost: db.t3.micro (burstable) ₹2,000+/month. Multi-AZ adds 50% cost but ensures high availability. Storage: ₹0.12 per GB-month. Ideal for web apps, fintech, analytics requiring reliable databases.'
    ],
    code: `# Create RDS instance (PostgreSQL)

aws rds create-db-instance \\
  --db-instance-identifier mydb \\
  --db-instance-class db.t3.micro \\
  --engine postgres \\
  --master-username admin \\
  --master-user-password MyPassword123 \\
  --allocated-storage 20 \\
  --region ap-south-1

# Wait for instance to create (5-10 minutes)
aws rds describe-db-instances --db-instance-identifier mydb

# Connect from EC2
psql -h mydb.c9akciq32.ap-south-1.rds.amazonaws.com -U admin -d postgres

# Create table
CREATE TABLE users (id SERIAL, name VARCHAR(100), email VARCHAR(100));

# Modify instance (scale up)
aws rds modify-db-instance \\
  --db-instance-identifier mydb \\
  --db-instance-class db.t3.small \\
  --apply-immediately

# Create backup
aws rds create-db-snapshot --db-instance-identifier mydb --db-snapshot-identifier mydb-backup

# Delete instance
aws rds delete-db-instance --db-instance-identifier mydb --skip-final-snapshot`,
    output: 'Database endpoint, connection string, backup automated.',
    notes: [
      'RDS = no ops overhead, just SQL',
      'Multi-AZ = high availability (recommended for prod)',
      'Read replicas = scale read-heavy apps'
    ],
    livePreview: false,
    practice: {
      title: 'Create RDS & Query',
      description: 'Create RDS PostgreSQL. Connect and create a users table with id, name, email columns.',
      hint: 'create-db-instance → wait → connect with psql → CREATE TABLE',
      solution: 'aws rds create-db-instance (wait 10min) → psql -h endpoint → CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR, email VARCHAR)'
    }
  },

  {
    id: 'aws-lambda',
    category: 'AWS Basics',
    title: 'Lambda: Serverless Computing on AWS',
    difficulty: 'Intermediate',
    theory: [
      'Lambda is serverless computing. Upload code (zip), AWS manages servers, OS, scaling, deployment. You pay per execution millisecond. No servers to manage, auto-scales from 0 to 1,000s of concurrent executions.',
      'Languages supported: Python, Node.js, Java, C#, Ruby, Go. Triggers: API Gateway (HTTP), S3 events, DynamoDB streams, SQS, CloudWatch events, SNS. Execution limit: 15 minutes per invocation.',
      'Ideal for: Web APIs, image resizing on S3 upload, scheduled tasks (cron), data processing, webhooks, IoT backends. Cost: ₹0.0000002 per millisecond (extremely cheap for sporadic workloads). Ola, Swiggy use Lambda for APIs.'
    ],
    code: `# Lambda Function (Python)

# lambda_function.py
import json

def lambda_handler(event, context):
    name = event.get('name', 'World')
    return {
        'statusCode': 200,
        'body': json.dumps(f'Hello, {name}!')
    }

# Deploy
zip function.zip lambda_function.py
aws lambda create-function \\
  --function-name hello-world \\
  --runtime python3.11 \\
  --role arn:aws:iam::ACCOUNT:role/lambda-role \\
  --handler lambda_function.lambda_handler \\
  --zip-file fileb://function.zip \\
  --region ap-south-1

# Test
aws lambda invoke \\
  --function-name hello-world \\
  --payload '{"name":"Arjun"}' \\
  output.json

# Create API Gateway trigger
aws apigateway create-rest-api --name hello-api

# Update function
aws lambda update-function-code \\
  --function-name hello-world \\
  --zip-file fileb://function.zip`,
    output: '{"statusCode": 200, "body": "Hello, Arjun!"}',
    notes: [
      'Serverless = no ops, pay per use',
      'Cold start: first call ~1s, subsequent ~100ms',
      'Perfect for bursty, unpredictable workloads'
    ],
    livePreview: false,
    practice: {
      title: 'Create Lambda Function',
      description: 'Write Python Lambda that takes a city name, returns temperature (mock data). Test it.',
      hint: 'event["city"], return JSON with temp',
      solution: 'def handler(event, ctx):\n  city=event["city"]\n  temps={"Mumbai":35,"Delhi":40}\n  return {"city":city,"temp":temps.get(city)}'
    }
  },

  {
    id: 'aws-iam',
    category: 'AWS Basics',
    title: 'IAM: Identity and Access Management',
    difficulty: 'Intermediate',
    theory: [
      'IAM controls who has access to AWS resources and what they can do. Core concepts: Users (people), Groups (collection of users), Roles (assumable identity for services), Policies (permissions in JSON).',
      'Best practices: Enable MFA on root account, create individual IAM users (never share credentials), use groups for permissions, attach minimal policies (principle of least privilege). Never commit AWS credentials in code.',
      'Policies are JSON documents defining allowed/denied actions on resources. Example: Allow S3 read-only on bucket "my-bucket". Roles are assumed by EC2, Lambda, humans. Service roles let services call other services (EC2 → S3).'
    ],
    code: `# IAM User & Permissions

# Create IAM user
aws iam create-user --user-name developer

# Create access key (for CLI/SDK)
aws iam create-access-key --user-name developer

# Create policy (S3 read-only)
cat > s3-read-policy.json << EOF
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["s3:GetObject", "s3:ListBucket"],
    "Resource": "arn:aws:s3:::my-bucket/*"
  }]
}
EOF

# Attach policy to user
aws iam put-user-policy \\
  --user-name developer \\
  --policy-name s3-read \\
  --policy-document file://s3-read-policy.json

# Create group & add user
aws iam create-group --group-name developers
aws iam add-user-to-group --user-name developer --group-name developers

# List user's permissions
aws iam list-user-policies --user-name developer

# Create role for EC2 service
aws iam create-role \\
  --role-name EC2-S3-Access \\
  --assume-role-policy-document file://trust.json

# Attach policy to role
aws iam attach-role-policy \\
  --role-name EC2-S3-Access \\
  --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess`,
    output: 'User can access S3, Lambda can access RDS, EC2 can read CloudWatch logs.',
    notes: [
      'Never commit AWS keys to GitHub',
      'Use roles for services, not long-term credentials',
      'Principle of least privilege = minimum permissions needed'
    ],
    livePreview: false,
    practice: {
      title: 'Create IAM User with S3 Access',
      description: 'Create IAM user "data-analyst" with read-only S3 access to bucket "analytics-data". Generate access keys.',
      hint: 'create-user → put-user-policy (S3 GetObject) → create-access-key',
      solution: 'iam create-user data-analyst → put-user-policy with S3:GetObject on analytics-data → create-access-key'
    }
  },

  {
    id: 'aws-vpc',
    category: 'AWS Basics',
    title: 'VPC: Virtual Private Cloud Networking',
    difficulty: 'Advanced',
    theory: [
      'VPC is your isolated network in AWS. Contains subnets (public/private), security groups (firewall), network ACLs, route tables, gateways. Default VPC provided, but custom VPC allows full control.',
      'Public subnet: Has internet gateway, instances get public IP, accessible from internet. Private subnet: No internet gateway, instances hidden from internet, need NAT gateway to reach internet.',
      'VPC peering: Connect two VPCs (for multi-account architecture). VPN: Secure connection to on-premise. Best practice: Multi-AZ deployment for high availability.'
    ],
    code: `# Create VPC with subnets

# Create VPC (10.0.0.0/16)
aws ec2 create-vpc --cidr-block 10.0.0.0/16 --region ap-south-1

# Create Internet Gateway
aws ec2 create-internet-gateway --region ap-south-1

# Attach IGW to VPC
aws ec2 attach-internet-gateway \\
  --internet-gateway-id igw-abc123 \\
  --vpc-id vpc-xyz789

# Create public subnet (10.0.1.0/24)
aws ec2 create-subnet \\
  --vpc-id vpc-xyz789 \\
  --cidr-block 10.0.1.0/24 \\
  --availability-zone ap-south-1a

# Create private subnet (10.0.2.0/24)
aws ec2 create-subnet \\
  --vpc-id vpc-xyz789 \\
  --cidr-block 10.0.2.0/24 \\
  --availability-zone ap-south-1b

# Create security group (firewall)
aws ec2 create-security-group \\
  --group-name web-sg \\
  --description "Allow HTTP/HTTPS" \\
  --vpc-id vpc-xyz789

# Allow port 80 (HTTP)
aws ec2 authorize-security-group-ingress \\
  --group-id sg-abc123 \\
  --protocol tcp --port 80 --cidr 0.0.0.0/0

# Launch EC2 in public subnet
aws ec2 run-instances \\
  --image-id ami-0a7cf821b91bcccbc \\
  --instance-type t2.micro \\
  --subnet-id subnet-public \\
  --security-group-ids sg-abc123`,
    notes: [
      'VPC = your AWS network, isolated & secure',
      'Public subnet = web servers, load balancers',
      'Private subnet = databases, backend apps'
    ],
    livePreview: false,
    practice: {
      title: 'Design VPC Architecture',
      description: 'Design VPC for 3-tier app: web (public), app (private), database (private). Sketch subnets & gateways.',
      hint: 'IGW for public, NAT for private outbound, RDS in private',
      solution: 'Public subnet (web, IGW) → private subnet (app, NAT) → private subnet (RDS). Route: public→IGW, private→NAT→IGW'
    }
  },

  {
    id: 'aws-route53',
    category: 'AWS Basics',
    title: 'Route53: DNS and Domain Management',
    difficulty: 'Intermediate',
    theory: [
      'Route53 is AWS\'s DNS (Domain Name Service). Maps domain names (example.com) to IP addresses or AWS resources (EC2, S3, CloudFront, ELB). Also manages domain registration and health checks.',
      'DNS record types: A (IPv4), AAAA (IPv6), CNAME (alias), MX (email), TXT (text), NS (nameserver). Routing policies: Simple (single record), weighted (split traffic %), latency-based (nearest region), failover (active-passive).',
      'Use case: Point domain to CloudFront, geolocation routing for compliance (India IP → Mumbai, US IP → N. Virginia), health checks for failover. Cost: ₹50/month per hosted zone.'
    ],
    code: `# Route53 DNS Management

# Create hosted zone for example.com
aws route53 create-hosted-zone \\
  --name example.com \\
  --caller-reference 2024-01-01

# Get nameservers
aws route53 get-hosted-zone --id Z123456ABC

# Create A record (domain → IP)
aws route53 change-resource-record-sets \\
  --hosted-zone-id Z123456ABC \\
  --change-batch file://changeset.json

# changeset.json:
{
  "Changes": [{
    "Action": "CREATE",
    "ResourceRecordSet": {
      "Name": "www.example.com",
      "Type": "A",
      "TTL": 300,
      "ResourceRecords": [{"Value": "203.0.113.10"}]
    }
  }]
}

# Alias record (domain → CloudFront)
{
  "Name": "example.com",
  "Type": "A",
  "AliasTarget": {
    "HostedZoneId": "Z2FDTNDATAQYW2",
    "DNSName": "d111111abcdef8.cloudfront.net",
    "EvaluateTargetHealth": false
  }
}

# Health check for failover
aws route53 create-health-check \\
  --health-check-config IPAddress=203.0.113.10,Port=80,Type=HTTP`,
    notes: [
      'Route53 = AWS domain & DNS service',
      'Routing policies for advanced use cases',
      'Health checks enable automatic failover'
    ],
    livePreview: false,
    practice: {
      title: 'Configure DNS',
      description: 'Register example.in domain. Create A record pointing to EC2 public IP. Verify with nslookup.',
      hint: 'create-hosted-zone → change-resource-record-sets → nslookup example.in',
      solution: 'Route53 hosted zone → A record (example.in → EC2-IP) → Update nameservers at registrar'
    }
  },

  {
    id: 'aws-cloudfront',
    category: 'AWS Basics',
    title: 'CloudFront: CDN for Global Content Delivery',
    difficulty: 'Intermediate',
    theory: [
      'CloudFront is AWS\'s CDN (Content Delivery Network). Caches content (images, videos, HTML) on 600+ edge locations worldwide (including India: Mumbai, Delhi, Bangalore). Users download from nearest edge, reducing latency.',
      'Origins: S3 bucket, EC2, ALB, custom HTTP server. CloudFront sits between users and origin. Reduces bandwidth, improves user experience, offloads load from origin. Cost: based on data transfer out (₹0.6-₹1.2/GB from India).',
      'Use cases: Website CDN (static assets), video streaming, API acceleration, DDoS protection. Signed URLs for private content, cache control for freshness. Ola, Swiggy use CloudFront for image/video delivery.'
    ],
    code: `# Create CloudFront Distribution

aws cloudfront create-distribution \\
  --distribution-config file://config.json

# config.json:
{
  "CallerReference": "2024-01-01",
  "Comment": "My CDN",
  "DefaultRootObject": "index.html",
  "Origins": {
    "Quantity": 1,
    "Items": [{
      "Id": "myS3",
      "DomainName": "my-bucket.s3.ap-south-1.amazonaws.com",
      "S3OriginConfig": {}
    }]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "myS3",
    "ViewerProtocolPolicy": "redirect-to-https",
    "TrustedSigners": {
      "Enabled": false,
      "Quantity": 0
    },
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": {"Forward": "none"}
    },
    "MinTTL": 0
  },
  "Enabled": true
}

# Invalidate cache (force refresh)
aws cloudfront create-invalidation \\
  --distribution-id E123ABCD \\
  --paths "/*"

# Monitor stats
aws cloudfront get-distribution-statistics --id E123ABCD`,
    output: 'Distribution takes ~5 min to deploy. Content cached globally, users get 10-100x faster downloads.',
    notes: [
      'CDN caches content at edge locations',
      'Improves user experience & reduces origin load',
      'Invalidation forces cache refresh'
    ],
    livePreview: false,
    practice: {
      title: 'Setup CloudFront for S3',
      description: 'Create S3 bucket with images. Setup CloudFront distribution. Access image via CloudFront URL.',
      hint: 'S3 bucket (origin) → CloudFront distribution → CloudFront URL',
      solution: 'S3 bucket → CloudFront (S3 origin) → test https://d111111.cloudfront.net/image.jpg (cached globally)'
    }
  },

  {
    id: 'aws-free-tier',
    category: 'AWS Basics',
    title: 'AWS Free Tier: Getting Started',
    difficulty: 'Beginner',
    theory: [
      'AWS Free Tier offers free access to services for 12 months for new accounts. Includes: EC2 t2.micro (750 hours/month), S3 (5GB storage), RDS (750 hours db.t2.micro), Lambda (1M free requests/month), CloudFront (50GB transfer/month).',
      'Always-free services: Lambda (1M requests), SNS, SQS (1M requests), DynamoDB (25GB storage), CloudWatch (5GB logs), Elastic Load Balancing (750 hours). Perfect for learning without incurring charges.',
      'Important: Set billing alerts (USD 5+) to avoid surprise charges. Monitor usage. Stop instances when not in use. Delete test resources. Free Tier expires after 12 months (convert to paid or delete).'
    ],
    code: `# AWS Free Tier Limits (12 months)

EC2 t2.micro:
- 750 hours/month (≈ 1 instance always-on)
- Cost: ₹0 for 12 months, then ₹740/month

S3:
- 5GB storage free
- 20k GET requests free
- Cost: ₹0 first 5GB, then ₹1.4/GB

RDS db.t2.micro:
- 750 hours/month
- 20GB storage free
- Cost: ₹0 for 12 months, then ₹2,000+/month

Lambda:
- 1M free requests/month (always)
- 400k GB-seconds/month free
- Cost: ₹0 if under limits, ₹0.0000002 per ms otherwise

# Set billing alert
aws budgets create-budget \\
  --account-id 123456789 \\
  --budget file://budget.json

# budget.json:
{
  "BudgetName": "Monthly Budget",
  "BudgetLimit": {"Amount": "5", "Unit": "USD"},
  "TimeUnit": "MONTHLY",
  "BudgetType": "COST",
  "NotificationsWithSubscribers": [{
    "Notification": {
      "NotificationType": "FORECASTED",
      "ComparisonOperator": "GREATER_THAN",
      "Threshold": 100
    }
  }]
}`,
    notes: [
      'Free Tier = great for learning & prototyping',
      'Always set billing alerts',
      'Stop instances/delete resources to avoid charges'
    ],
    livePreview: false,
    practice: {
      title: 'Setup Free AWS Account',
      description: 'Create AWS account. Enable Free Tier. Launch EC2 t2.micro. Set ₹200 billing alert.',
      hint: 'signup → verify email/phone → Free Tier → budgets',
      solution: 'AWS signup → activate Free Tier → EC2 console → budgets create-budget (alert at ₹200)'
    }
  },

  // Azure Basics (8 topics)
  {
    id: 'azure-overview',
    category: 'Azure Basics',
    title: 'Azure Overview and Key Services',
    difficulty: 'Beginner',
    theory: [
      'Microsoft Azure is the 2nd largest cloud platform. Strong in enterprise (Windows/.NET integration, Active Directory, Microsoft 365). Services: Virtual Machines, App Service, SQL Database, Functions, Cosmos DB, AI/ML services.',
      'Azure regions in India: Central India (Pune), West India (Mumbai), South India (Hyderabad). Government/sovereign cloud option for compliance. Used by Indian banks, government, enterprises. Competes with AWS on features, beats on Microsoft integration.',
      'Pricing: Similar to AWS, sometimes cheaper. Azure Hybrid Benefit (reuse Windows licenses) saves money. Free account: $200 credit for 30 days, plus always-free services. Good for enterprises with Microsoft stack.'
    ],
    code: `# Azure Key Services

COMPUTE:
- Virtual Machines: IaaS (VMs)
- App Service: PaaS (web apps)
- Azure Functions: Serverless

STORAGE:
- Blob Storage: Object storage (like S3)
- Managed Disks: Block storage (like EBS)
- File Share: Network file system

DATABASE:
- SQL Database: Managed SQL Server/PostgreSQL
- Cosmos DB: NoSQL, globally replicated
- MySQL/PostgreSQL: Open-source databases

NETWORKING:
- Virtual Network: VPC equivalent
- App Gateway: Load balancer
- CDN: Content delivery (like CloudFront)

# Azure CLI
az vm create --resource-group mygroup --name myvm --image UbuntuLTS --region centralindia`,
    notes: [
      'Azure = strong in enterprise, Microsoft tech',
      'India regions: Pune (central), Mumbai (west)',
      'Hybrid Benefit = discount for Windows licenses'
    ],
    livePreview: false,
    practice: {
      title: 'Compare AWS vs Azure',
      description: 'Create comparison table: EC2 vs VM, S3 vs Blob, Lambda vs Functions. Pricing in Mumbai/Pune.',
      hint: 'Match service names, compare costs',
      solution: 'EC2=VM, S3=Blob Storage, Lambda=Functions, RDS=SQL Database. Similar pricing, Azure cheaper for Windows.'
    }
  },

  {
    id: 'azure-vms',
    category: 'Azure Basics',
    title: 'Azure Virtual Machines (VMs)',
    difficulty: 'Intermediate',
    theory: [
      'Azure VMs are similar to AWS EC2. Choose OS (Linux, Windows), VM size (Standard_B1s for small, Standard_D2s for general). Pay per hour. Managed disks for storage (automatic backups).',
      'Sizes: B-series (burstable, cheap), D-series (general purpose, compute optimized), E-series (memory optimized). Availability Sets/Zones for high availability. Managed images for custom OS snapshots.',
      'Security: Network Security Groups (firewall), Key Vault (secrets management), Managed identity (IAM). Hybrid benefit (reuse Windows licenses) saves money.'
    ],
    code: `# Create Azure VM in Pune

az group create --name mygroup --location centralindia

az vm create \\
  --resource-group mygroup \\
  --name myvm \\
  --image UbuntuLTS \\
  --size Standard_B1s \\
  --admin-username azureuser \\
  --generate-ssh-keys \\
  --location centralindia

# List VMs
az vm list --output table

# Start/stop VM
az vm start --resource-group mygroup --name myvm
az vm stop --resource-group mygroup --name myvm

# Connect via SSH
ssh azureuser@<public-ip>

# Delete VM
az vm delete --resource-group mygroup --name myvm`,
    notes: [
      'Azure VMs = EC2 equivalent',
      'B-series = cheapest, suitable for dev',
      'Managed disks = automatic backups'
    ],
    livePreview: false,
    practice: {
      title: 'Launch Azure VM',
      description: 'Create Ubuntu VM in Pune. SSH in and run: uname -a',
      hint: 'az group create → az vm create → ssh',
      solution: 'az group create (centralindia) → az vm create (UbuntuLTS) → wait 2min → ssh azureuser@ip'
    }
  },

  {
    id: 'azure-blob-storage',
    category: 'Azure Basics',
    title: 'Azure Blob Storage',
    difficulty: 'Intermediate',
    theory: [
      'Azure Blob Storage is object storage (equivalent to AWS S3). Store unlimited blobs (files) in containers (buckets). Hot (frequent access), Cool (30 days+), Archive (rarely accessed) tiers for cost optimization.',
      'Access tiers: Hot (₹1.6/GB for India), Cool (₹0.8/GB), Archive (₹0.2/GB). Choose based on access patterns. 3-AZ replication built-in.',
      'Security: Shared Access Signatures (SAS) for temporary URLs, Key Vault for credentials, encryption at rest and in transit. Azure CLI or Azure Storage Explorer for easy management.'
    ],
    code: `# Azure Blob Storage

# Create storage account
az storage account create \\
  --name mystorageaccount \\
  --resource-group mygroup \\
  --location centralindia

# Create container
az storage container create \\
  --name mycontainer \\
  --account-name mystorageaccount

# Upload blob
az storage blob upload \\
  --account-name mystorageaccount \\
  --container-name mycontainer \\
  --name photo.jpg \\
  --file photo.jpg

# List blobs
az storage blob list \\
  --account-name mystorageaccount \\
  --container-name mycontainer

# Download blob
az storage blob download \\
  --account-name mystorageaccount \\
  --container-name mycontainer \\
  --name photo.jpg

# Generate SAS URL (temporary access)
az storage blob generate-sas \\
  --account-name mystorageaccount \\
  --container-name mycontainer \\
  --name photo.jpg \\
  --expiry 2024-01-01`,
    notes: [
      'Blob Storage = S3 equivalent',
      'Hot/Cool/Archive tiers = cost optimization',
      'SAS URLs = temporary access without credentials'
    ],
    livePreview: false,
    practice: {
      title: 'Upload to Blob Storage',
      description: 'Create storage account in Pune. Upload a file. Generate public SAS URL.',
      hint: 'create account → create container → upload → generate-sas',
      solution: 'storage account create → container create → blob upload → generate-sas (expiry 1 hour)'
    }
  },

  {
    id: 'azure-functions',
    category: 'Azure Basics',
    title: 'Azure Functions: Serverless on Azure',
    difficulty: 'Intermediate',
    theory: [
      'Azure Functions = serverless (equivalent to AWS Lambda). Write code, Azure manages servers. Triggers: HTTP, Timer, Blob, Queue, Event Hub. Languages: C#, JavaScript, Python, Java, PowerShell.',
      'Pricing: Consumption plan (pay per execution), Premium plan (reserved capacity). ₹0.0000002 per GB-second (similar to Lambda). Scales automatically 0 → 1000s.',
      'Bindings: Input (read data), Output (write data). Simplified function development without boilerplate. Azure ecosystem integration (Cosmos DB, SQL, Service Bus).'
    ],
    code: `# Azure Function (Python HTTP trigger)

# function_app.py
import azure.functions as func

app = func.FunctionApp()

@app.function_trigger(route="hello", methods=["GET", "POST"])
def http_trigger(req: func.HttpRequest) -> func.HttpResponse:
    name = req.params.get('name') or 'World'
    return func.HttpResponse(f"Hello, {name}!")

# Deploy
func new --template HttpTrigger --language python
func start

# In Azure Portal or CLI:
az functionapp create \\
  --resource-group mygroup \\
  --consumption-plan-location centralindia \\
  --runtime python \\
  --functions-version 4 \\
  --name myfunctionapp

# Deploy
func azure functionapp publish myfunctionapp`,
    notes: [
      'Azure Functions = Lambda equivalent',
      'Consumption plan = pay per execution',
      'Bindings = simplified I/O'
    ],
    livePreview: false,
    practice: {
      title: 'Create Azure Function',
      description: 'Write HTTP Function that returns JSON with current time. Test endpoint.',
      hint: 'HTTP trigger, return JSON with datetime.now()',
      solution: 'HTTP trigger → import datetime → return {"time": str(datetime.now())} as JSON'
    }
  },

  {
    id: 'azure-ad',
    category: 'Azure Basics',
    title: 'Azure Active Directory (Azure AD)',
    difficulty: 'Intermediate',
    theory: [
      'Azure AD (now Entra ID) is identity management. Manages users, groups, applications, devices. Central authentication for Microsoft 365, Office, Azure services. SSO across 1000s of apps.',
      'Benefits: Security (MFA, conditional access), simplified user management (sync with on-premise AD), application integration, compliance (audit logs). Used by enterprises for centralized access control.',
      'RBAC (Role-Based Access Control): Assign roles (Owner, Contributor, Reader) to users/groups for Azure resources. Granular permissions management.'
    ],
    code: `# Azure AD Management

# Create user
az ad user create \\
  --display-name "John Doe" \\
  --user-principal-name john@company.onmicrosoft.com \\
  --password "SecurePassword123!"

# Create group
az ad group create --display-name developers --mail-nickname devgroup

# Add user to group
az ad group member add --group devgroup --member-id john@company.onmicrosoft.com

# Assign role (Contributor to resource group)
az role assignment create \\
  --assignee john@company.onmicrosoft.com \\
  --role Contributor \\
  --resource-group mygroup

# List roles
az role assignment list --resource-group mygroup`,
    notes: [
      'Azure AD = enterprise identity management',
      'SSO = single sign-on to multiple apps',
      'RBAC = granular access control'
    ],
    livePreview: false,
    practice: {
      title: 'Manage Users in Azure AD',
      description: 'Create 2 Azure AD users. Add them to "developers" group. Assign Contributor role.',
      hint: 'ad user create → ad group create → group member add → role assignment create',
      solution: 'Create user1, user2 → Create developers group → Add both users → role assignment (Contributor)'
    }
  },

  {
    id: 'azure-sql',
    category: 'Azure Basics',
    title: 'Azure SQL Database',
    difficulty: 'Intermediate',
    theory: [
      'Azure SQL Database = managed SQL Server/PostgreSQL/MySQL. No ops overhead (backups, patching, scaling automated). High availability (99.99% SLA with failover).',
      'Deployment options: Single database (for small workloads), Elastic pool (cost-optimized for variable workloads), Managed instance (full SQL Server compatibility).',
      'Cost: Single database ₹2,000+/month. Elastic pool shares resources, cheaper for many small DBs. Always-on backups (35 days). Geo-replication for disaster recovery.'
    ],
    code: `# Create Azure SQL Database

az sql server create \\
  --name myserver \\
  --resource-group mygroup \\
  --location centralindia \\
  --admin-user azureuser \\
  --admin-password SecurePassword123!

az sql db create \\
  --resource-group mygroup \\
  --server myserver \\
  --name mydb \\
  --edition GeneralPurpose \\
  --compute-model Serverless

# Get connection string
az sql db show-connection-string \\
  --client sqlcmd \\
  --server myserver \\
  --name mydb

# Connect
sqlcmd -S myserver.database.windows.net -U azureuser -P SecurePassword123! -d mydb

# Create table
CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(100));

# Backup
az sql db backup create \\
  --resource-group mygroup \\
  --server myserver \\
  --database mydb`,
    notes: [
      'Azure SQL = managed database service',
      'No ops (Azure handles backup, patching)',
      'Serverless = auto-pause, pay only when used'
    ],
    livePreview: false,
    practice: {
      title: 'Create SQL Database',
      description: 'Create Azure SQL Database. Connect and create a table. Query data.',
      hint: 'sql server create → sql db create → sqlcmd',
      solution: 'sql server → sql db (GeneralPurpose) → sqlcmd (connect) → CREATE TABLE'
    }
  },

  {
    id: 'azure-devops',
    category: 'Azure Basics',
    title: 'Azure DevOps: CI/CD and Project Management',
    difficulty: 'Intermediate',
    theory: [
      'Azure DevOps = suite of tools for development. Boards (project tracking), Repos (Git), Pipelines (CI/CD), Test Plans (QA), Artifacts (package management).',
      'CI/CD pipelines automate build, test, deploy. Trigger on code push → build → test → deploy to Azure. Supports multi-stage (dev → staging → prod).',
      'Integration: Connect GitHub repos, Docker registries, Kubernetes. Used by enterprises for end-to-end DevOps. Free for up to 6 users, unlimited open-source.'
    ],
    code: `# Azure DevOps Pipeline (azure-pipelines.yml)

trigger:
  - main

pool:
  vmImage: 'ubuntu-latest'

steps:
- task: UsePythonVersion@0
  inputs:
    versionSpec: '3.9'

- script: |
    python -m pip install --upgrade pip
    pip install -r requirements.txt
  displayName: 'Install dependencies'

- script: |
    python -m pytest
  displayName: 'Run tests'

- task: PublishBuildArtifacts@1
  inputs:
    PathtoPublish: '$(Build.ArtifactStagingDirectory)'
    ArtifactName: 'drop'

- task: AzureWebApp@1
  inputs:
    azureSubscription: 'Azure subscription'
    appName: 'myapp'
    package: '$(Build.ArtifactStagingDirectory)'`,
    notes: [
      'Azure DevOps = GitHub Actions competitor',
      'Pipelines automate build & deploy',
      'Free for small teams, open-source'
    ],
    livePreview: false,
    practice: {
      title: 'Create CI/CD Pipeline',
      description: 'Write azure-pipelines.yml that builds Python app, runs tests, deploys to App Service.',
      hint: 'trigger → pool → pip install → pytest → PublishBuildArtifacts',
      solution: 'trigger (main) → install requirements → run pytest → publish artifacts'
    }
  },

  // GCP Basics (7 topics)
  {
    id: 'gcp-overview',
    category: 'GCP Basics',
    title: 'GCP Overview and Key Services',
    difficulty: 'Beginner',
    theory: [
      'Google Cloud Platform (GCP) is 3rd largest cloud. Strong in data, AI/ML, analytics. Services: Compute Engine (VMs), Cloud Run (serverless containers), BigQuery (data warehouse), Vertex AI (ML platform).',
      'Regions in India: asia-south1 (Delhi), asia-south2 (Mumbai), asia-southeast1 (Bangalore). Used by Jio, Indian startups for analytics/AI. Known for innovation in data science tools.',
      'Pricing: Often cheaper than AWS/Azure. Sustained use discounts (40% off if VM runs 30+ days). Committed use discounts (25-55% for 1-3 years). ₹100 free trial for new accounts.'
    ],
    code: `# GCP Key Services

COMPUTE:
- Compute Engine: IaaS (VMs)
- Cloud Run: Serverless containers
- App Engine: PaaS (managed apps)

STORAGE:
- Cloud Storage: Object storage (S3 equivalent)
- Firestore: NoSQL database
- BigTable: Wide-column database

DATA & AI:
- BigQuery: Data warehouse (1000 TB query in seconds)
- Vertex AI: ML platform (AutoML, custom training)
- Dataflow: Batch & stream processing

# gcloud CLI
gcloud compute instances create myvm \\
  --zone asia-south1-a \\
  --machine-type e2-micro`,
    notes: [
      'GCP = strong in data, AI/ML',
      'BigQuery = fastest SQL for petabyte scale',
      'India regions: Delhi (south1), Mumbai (south2)'
    ],
    livePreview: false,
    practice: {
      title: 'Compare GCP vs AWS',
      description: 'Create comparison: Compute Engine vs EC2, Cloud Storage vs S3, BigQuery vs Athena. Pricing in Delhi.',
      hint: 'Match services, compare features & costs',
      solution: 'Compute Engine=EC2, Cloud Storage=S3, BigQuery=Athena. GCP cheaper for long-running workloads, better ML tools.'
    }
  },

  {
    id: 'gcp-compute-engine',
    category: 'GCP Basics',
    title: 'GCP Compute Engine: Virtual Machines',
    difficulty: 'Intermediate',
    theory: [
      'Compute Engine = VMs on GCP. Choose machine type (e2-micro for small, n2-standard for general). Persistent disks (storage), images (OS snapshots), instance templates (repeatable configs).',
      'Zones: asia-south1-a, asia-south1-b, asia-south1-c (Delhi). Regions: asia-south1, asia-south2. Zones for single-region, regions for multi-region redundancy.',
      'Pricing: per-second billing (unlike AWS per-hour). e2-micro: ₹900/month Delhi. Sustained use discounts: 30% for 25%+ month usage, 40% for 50%+. Committed: 25-55% discount for 1-3 years.'
    ],
    code: `# Create GCP Compute Engine VM

gcloud compute instances create myvm \\
  --zone asia-south1-a \\
  --machine-type e2-micro \\
  --image-family debian-11 \\
  --image-project debian-cloud \\
  --boot-disk-size 30GB

# List instances
gcloud compute instances list

# SSH into VM
gcloud compute ssh myvm --zone asia-south1-a

# Stop instance
gcloud compute instances stop myvm --zone asia-south1-a

# Start instance
gcloud compute instances start myvm --zone asia-south1-a

# Create custom machine (2 vCPU, 4GB RAM)
gcloud compute instances create custom-vm \\
  --zone asia-south1-a \\
  --custom-cpu 2 \\
  --custom-memory 4`,
    notes: [
      'Compute Engine = EC2 equivalent',
      'Per-second billing (cheaper than AWS hourly)',
      'Sustained use discounts save 30-40%'
    ],
    livePreview: false,
    practice: {
      title: 'Launch GCP VM',
      description: 'Create Debian VM in Delhi. SSH in and install Node.js. Run: node --version',
      hint: 'gcloud compute instances create → gcloud compute ssh → apt install nodejs',
      solution: 'instances create (e2-micro, Delhi) → ssh → sudo apt update && apt install nodejs'
    }
  },

  {
    id: 'gcp-cloud-storage',
    category: 'GCP Basics',
    title: 'GCP Cloud Storage',
    difficulty: 'Intermediate',
    theory: [
      'Cloud Storage = object storage (S3 equivalent). Buckets (containers), objects (files). Storage classes: Standard (hot), Nearline (30 days+), Coldline (90 days+), Archive (long-term, ₹0.04/GB).',
      'Pricing: Standard ₹1.2/GB India, Nearline ₹0.6/GB, Archive ₹0.12/GB. Free egress within India, paid egress to internet.',
      'Features: Versioning (keep object history), Lifecycle policies (auto-delete old objects), signed URLs (temporary access), customer-managed encryption, IAM access control.'
    ],
    code: `# GCP Cloud Storage

# Create bucket (globally unique name)
gsutil mb gs://my-bucket-2024

# Upload object
gsutil cp photo.jpg gs://my-bucket-2024/

# Upload folder
gsutil -m cp -r ./images gs://my-bucket-2024/

# List bucket contents
gsutil ls -r gs://my-bucket-2024/

# Download object
gsutil cp gs://my-bucket-2024/photo.jpg ./

# Make object public
gsutil acl ch -u AllUsers:R gs://my-bucket-2024/photo.jpg

# Generate signed URL (temporary access, 1 hour)
gsutil signurl ~/key.json -d 1h gs://my-bucket-2024/photo.jpg

# Set lifecycle policy (delete old objects)
cat > lifecycle.json << EOF
{
  "lifecycle": {
    "rule": [{
      "action": {"type": "Delete"},
      "condition": {"age": 90}
    }]
  }
}
EOF
gsutil lifecycle set lifecycle.json gs://my-bucket-2024/

# Delete bucket
gsutil -m rm -r gs://my-bucket-2024/`,
    notes: [
      'Cloud Storage = S3 equivalent',
      'Storage classes = cost optimization tiers',
      'Signed URLs = temporary access without public'
    ],
    livePreview: false,
    practice: {
      title: 'Upload & Share via Cloud Storage',
      description: 'Create bucket. Upload file. Generate signed URL. Share temporarily (1 hour).',
      hint: 'gsutil mb → cp → signurl',
      solution: 'mb gs://bucket → cp file.txt gs://bucket → signurl (1 hour expiry)'
    }
  },

  {
    id: 'gcp-cloud-functions',
    category: 'GCP Basics',
    title: 'GCP Cloud Functions: Serverless',
    difficulty: 'Intermediate',
    theory: [
      'Cloud Functions = serverless (Lambda equivalent). Write function, GCP manages servers. Triggers: HTTP, Pub/Sub, Cloud Storage, Cloud Firestore, Cloud Tasks.',
      'Languages: Python, Node.js, Go, Java, Ruby, PHP. Free tier: 2M invocations/month. Pricing: ₹0.0000003 per invocation + ₹0.0000167 per GB-second (cheaper than Lambda).',
      'Use cases: File processing (resize image on S3 upload), scheduled tasks, webhooks, data pipeline, IoT. Execution limit: 9 minutes (longer than Lambda 15 min, better for data jobs).'
    ],
    code: `# GCP Cloud Function (Python HTTP)

# main.py
import functions_framework

@functions_framework.http
def hello_http(request):
    request_json = request.get_json(silent=True)
    request_args = request.args

    name = request_json.get('name') if request_json else None
    if not name:
        name = request_args.get('name', 'World')

    return f'Hello {name}!'

# requirements.txt (empty for basic)

# Deploy
gcloud functions deploy hello_http \\
  --runtime python311 \\
  --trigger-http \\
  --allow-unauthenticated \\
  --region asia-south1

# Test
curl https://asia-south1-PROJECT.cloudfunctions.net/hello_http?name=Arjun

# View logs
gcloud functions logs read hello_http --region asia-south1`,
    notes: [
      'Cloud Functions = Lambda equivalent',
      'Per-invocation + GB-second billing',
      'Longer execution time (9 min) than Lambda (15 min)'
    ],
    livePreview: false,
    practice: {
      title: 'Deploy Cloud Function',
      description: 'Write HTTP function returning JSON. Deploy. Call via HTTPS.',
      hint: '@functions_framework.http, return JSON',
      solution: 'def hello(req): return {"message": "Hello"} → gcloud functions deploy (--trigger-http)'
    }
  },

  {
    id: 'gcp-bigquery',
    category: 'GCP Basics',
    title: 'BigQuery: Data Warehouse & Analytics',
    difficulty: 'Intermediate',
    theory: [
      'BigQuery = serverless data warehouse. Query petabytes in seconds. Columnar storage (efficient for analytics). No servers to manage, pay per query (₹6.25 per TB scanned in India).',
      'Datasets (collections), Tables (structured data), Queries (SQL), Visualizations (dashboards). Stream data in real-time or batch import. Built-in ML (BQML) for ML models without Python.',
      'Use cases: Analytics, data science, business intelligence. Jio uses BigQuery for network analytics. Indian startups use for product analytics, recommendation systems.'
    ],
    code: `# BigQuery Operations

# Create dataset
bq mk --dataset my_dataset

# Create table
bq mk \\
  --table \\
  my_dataset.users \\
  schema.json

# Load data from CSV
bq load \\
  --source_format=CSV \\
  my_dataset.users \\
  data.csv

# Query
bq query --use_legacy_sql=false \\
  'SELECT COUNT(*) as count FROM my_dataset.users'

# Stream data (real-time)
bq insert \\
  my_dataset.users \\
  '{"id":1,"name":"Arjun","email":"arjun@example.com"}'

# Create ML model (linear regression)
CREATE OR REPLACE MODEL my_dataset.price_model
OPTIONS(model_type='linear_reg') AS
SELECT price, sqft, bedrooms
FROM my_dataset.homes;

# Predict
SELECT * FROM ML.PREDICT(MODEL my_dataset.price_model,
  (SELECT 2000 as sqft, 3 as bedrooms))`,
    notes: [
      'BigQuery = petabyte-scale analytics',
      'Pay per query (₹6.25/TB in India)',
      'BQML = ML without Python code'
    ],
    livePreview: false,
    practice: {
      title: 'Query Public Dataset',
      description: 'Query Google\'s public dataset (e.g., StackOverflow, NYC Taxi). Count rows, find average.',
      hint: 'bq query bigquery-public-data.stackoverflow.posts_questions',
      solution: 'SELECT COUNT(*) FROM `bigquery-public-data.stackoverflow.posts_questions` LIMIT 1'
    }
  },

  {
    id: 'gcp-firebase',
    category: 'GCP Basics',
    title: 'Firebase: Backend-as-a-Service on GCP',
    difficulty: 'Beginner',
    theory: [
      'Firebase = backend-as-a-service built on GCP. Includes: Realtime Database, Firestore (NoSQL), Authentication, Hosting, Cloud Functions, Analytics.',
      'Developer-friendly: Easy authentication (email, Google, phone), real-time sync, hosting with CDN, analytics built-in. Perfect for mobile/web apps.',
      'Pricing: Free tier generous (125k reads/day Firestore), pay-as-you-go scale. Used by startups for rapid MVP development.'
    ],
    code: `# Firebase (JavaScript example)

// Initialize Firebase
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = { /* Your config */ };
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Google Sign-In
const provider = new GoogleAuthProvider();
signInWithPopup(auth, provider);

// Write data
await addDoc(collection(db, "users"), {
  name: "Arjun",
  email: "arjun@example.com"
});

// Read data
db.collection("users").onSnapshot((snapshot) => {
  snapshot.forEach((doc) => {
    console.log(doc.data());
  });
});

# Deploy hosting
firebase deploy --only hosting`,
    notes: [
      'Firebase = Google\'s BaaS',
      'Realtime sync = live updates',
      'Free tier sufficient for MVP'
    ],
    livePreview: false,
    practice: {
      title: 'Create Firebase App',
      description: 'Setup Firebase project. Create Firestore collection. Write/read data from web app.',
      hint: 'firebase init → addDoc → onSnapshot',
      solution: 'firebase init (firestore) → addDoc(collection(...)) → onSnapshot listener'
    }
  },

  {
    id: 'gcp-free-tier',
    category: 'GCP Basics',
    title: 'GCP Free Tier and Trial',
    difficulty: 'Beginner',
    theory: [
      'GCP Free Trial: ₹21,500 ($300) credit for 90 days. Compute Engine (1 f1-micro/month in US region), Cloud Storage (5GB), BigQuery (1 TB query/month), Cloud Functions (2M invocations/month).',
      'Always-free tier (even after trial): Cloud Storage (5GB), Cloud Functions (2M invocations), Firestore (1GB storage, 50k reads/day), BigQuery (1 TB queries/month), Cloud Run (180k GB-seconds), Cloud VPCs, VPN.',
      'Setup: Create Google account, enable Free Trial, set spending limit. India regions (Delhi, Mumbai) available in free tier.'
    ],
    code: `# Check GCP Free Tier Usage

gcloud billing budgets create \\
  --billing-account=ACCOUNT_ID \\
  --display-name="My Budget" \\
  --budget-amount=USD100 \\
  --threshold-rule=percent=50,percent=100

# Check quotas
gcloud compute project-info describe --project=PROJECT_ID

# Monitor costs
gcloud billing accounts list
gcloud billing accounts describe ACCOUNT_ID`,
    notes: [
      'Free Trial: ₹21,500 credit for 90 days',
      'Always-free: Generous limits, perfect for learning',
      'India regions included in free tier'
    ],
    livePreview: false,
    practice: {
      title: 'Setup GCP Free Account',
      description: 'Create GCP account. Claim ₹21,500 trial. Launch 1 e2-micro in Delhi.',
      hint: 'google account → GCP signup → free trial → compute create',
      solution: 'Sign in → claim $300 credit → gcloud init → instances create (Delhi)'
    }
  },

  // DevOps & Cloud (8 topics)
  {
    id: 'devops-intro',
    category: 'DevOps & Cloud',
    title: 'What is DevOps?',
    difficulty: 'Beginner',
    theory: [
      'DevOps = Development + Operations. Breaks silos between developers (who build features) and operations (who run servers). Goal: faster, reliable, automated software delivery.',
      'Practices: Infrastructure as Code (IaC), Continuous Integration (CI), Continuous Deployment (CD), monitoring, on-call culture. Mindset: shared responsibility, automation, rapid feedback.',
      'Benefits: Faster deployments (100x faster), fewer bugs, faster recovery, happier teams. Used by Ola, Swiggy, Netflix, Amazon. Industry standard for modern companies.'
    ],
    code: `# DevOps Workflow

BEFORE DevOps:
Dev writes code → Operations manually deploys → Takes weeks → Failures common

AFTER DevOps:
Developer commits → Automated tests → Automated deploy (seconds) → Monitoring alerts

DevOps Tools:
- Version Control: Git (code)
- CI: GitHub Actions, Jenkins (automated test)
- CD: Kubernetes, Terraform (automated deploy)
- Monitoring: Prometheus, Grafana (observability)
- IaC: Terraform, CloudFormation (infrastructure)`,
    notes: [
      'DevOps = culture of automation & collaboration',
      'CI/CD = continuous integration & deployment',
      'IaC = infrastructure as code (git-like version control for servers)'
    ],
    livePreview: false,
    practice: {
      title: 'Understand DevOps Workflow',
      description: 'Sketch DevOps pipeline for a web app: code → test → deploy. Label each stage with tool.',
      hint: 'Git (VCS) → GitHub Actions (CI) → Kubernetes (CD) → Prometheus (monitor)',
      solution: 'Git commit → GitHub Actions (run tests) → Deploy to K8s → Prometheus monitors health'
    }
  },

  {
    id: 'cicd-pipelines',
    category: 'DevOps & Cloud',
    title: 'CI/CD Pipelines: Continuous Integration & Deployment',
    difficulty: 'Intermediate',
    theory: [
      'CI (Continuous Integration): Every code push triggers automated tests. Failures caught immediately. Prevents bad code from merging.',
      'CD (Continuous Deployment): Passing code automatically deployed to production. Or Continuous Delivery = manual approval before prod. Enables fast, safe releases.',
      'Pipeline stages: Source (Git) → Build → Test → Deploy (staging) → Deploy (prod). Tools: GitHub Actions, GitLab CI, Jenkins, Azure Pipelines, Google Cloud Build.'
    ],
    code: `# GitHub Actions CI/CD Pipeline (.github/workflows/deploy.yml)

name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3

    - name: Install dependencies
      run: npm install

    - name: Run tests
      run: npm test

    - name: Build
      run: npm run build

    - name: Deploy to AWS
      env:
        AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY }}
        AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_KEY }}
      run: |
        aws s3 cp dist/ s3://my-bucket/ --recursive
        aws cloudfront create-invalidation --distribution-id E123 --paths "/*"`,
    notes: [
      'CI = automated testing on every push',
      'CD = automated deployment on passing tests',
      'Enables safe, fast releases'
    ],
    livePreview: false,
    practice: {
      title: 'Create CI/CD Pipeline',
      description: 'Write GitHub Actions workflow: install, test, build, deploy Node.js app.',
      hint: 'on: push → npm install → npm test → npm run build → deploy',
      solution: '.github/workflows/ci.yml → on push → npm ci → npm test → npm run build → deploy'
    }
  },

  {
    id: 'docker-basics',
    category: 'DevOps & Cloud',
    title: 'Docker: Containerization Basics',
    difficulty: 'Intermediate',
    theory: [
      'Docker packages application + dependencies in container. Container = lightweight, isolated, reproducible. Works on laptop = works on prod (no "works on my machine").',
      'Dockerfile = recipe. docker build = create image. docker run = create container (instance). Image = blueprint (read-only), Container = instance (running).',
      'Benefits: Consistency, portability, efficiency (smaller than VMs), fast startup. Industry standard for deployment. AWS ECS, Google Cloud Run, Kubernetes all use Docker.'
    ],
    code: `# Dockerfile (Python Flask)

FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]

# Build image
docker build -t my-app:1.0 .

# Run container
docker run -p 5000:5000 my-app:1.0

# Access app
curl http://localhost:5000

# Tag image (for registry)
docker tag my-app:1.0 user/my-app:1.0

# Push to Docker Hub
docker push user/my-app:1.0

# Run someone else's image
docker run -p 80:80 nginx:latest

# List images
docker images

# Stop container
docker stop <container-id>

# Delete image
docker rmi my-app:1.0`,
    output: 'Container starts in 1-2 seconds. App accessible on localhost:5000.',
    notes: [
      'Dockerfile = Infrastructure as Code for containers',
      'Image = reusable blueprint, Container = running instance',
      'Docker Hub = registry for images'
    ],
    livePreview: false,
    practice: {
      title: 'Build & Run Docker Container',
      description: 'Write Dockerfile for Node.js app. Build image. Run container on port 3000.',
      hint: 'FROM node:18 → WORKDIR → COPY → RUN npm install → CMD npm start',
      solution: 'Dockerfile (Node base) → docker build → docker run -p 3000:3000'
    }
  },

  {
    id: 'kubernetes-intro',
    category: 'DevOps & Cloud',
    title: 'Kubernetes: Orchestrating Containers',
    difficulty: 'Advanced',
    theory: [
      'Kubernetes (K8s) = container orchestration. Manage 1000s of containers across multiple servers. Auto-scaling, self-healing, rolling updates, load balancing.',
      'Concepts: Pod (smallest unit, 1+ containers), Deployment (manage replicas), Service (expose pods), ConfigMap (config), Secret (credentials). Declarative YAML configs.',
      'Used by Ola, Uber, Netflix, Google. Standard for production deployments. Managed services: AWS EKS, Azure AKS, Google GKE.'
    ],
    code: `# Kubernetes Deployment (YAML)

apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: app
        image: my-app:1.0
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
        resources:
          requests:
            cpu: "100m"
            memory: "128Mi"
          limits:
            cpu: "500m"
            memory: "512Mi"

---
apiVersion: v1
kind: Service
metadata:
  name: my-app-service
spec:
  type: LoadBalancer
  selector:
    app: my-app
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000

# Apply
kubectl apply -f deployment.yaml

# Check pods
kubectl get pods

# Logs
kubectl logs <pod-name>

# Scale to 5 replicas
kubectl scale deployment my-app --replicas 5`,
    notes: [
      'Kubernetes = production container orchestration',
      'Declarative YAML = version control infrastructure',
      'Self-healing = auto-restart failed pods'
    ],
    livePreview: false,
    practice: {
      title: 'Deploy to Kubernetes',
      description: 'Write K8s Deployment YAML for Node.js app (3 replicas). Expose via Service.',
      hint: 'Deployment (replicas: 3) → Service (LoadBalancer)',
      solution: 'Deployment with my-app image → Service (port 80 → 3000) → kubectl apply'
    }
  },

  {
    id: 'infrastructure-as-code',
    category: 'DevOps & Cloud',
    title: 'Infrastructure as Code (IaC)',
    difficulty: 'Intermediate',
    theory: [
      'Infrastructure as Code = define servers, networks, storage in code (like Dockerfile for apps). Benefits: Version control, reproducibility, automation, documentation.',
      'Tools: Terraform (cloud-agnostic, HCL), CloudFormation (AWS-only, JSON/YAML), Ansible (config management). Git-like workflow: write config → review → apply.',
      'Practice: All infrastructure in Git. Code review for infra changes. Rollback capability. DevOps teams maintain infrastructure code like software engineers maintain app code.'
    ],
    code: `# Terraform: AWS VPC + EC2 (main.tf)

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "ap-south-1"
}

resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
}

resource "aws_subnet" "public" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "ap-south-1a"
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
}

resource "aws_instance" "web" {
  ami           = "ami-0a7cf821b91bcccbc"
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.public.id
  tags = {
    Name = "web-server"
  }
}

output "instance_ip" {
  value = aws_instance.web.public_ip
}

# Commands
terraform init       # Download provider
terraform plan       # Preview changes
terraform apply      # Create resources
terraform destroy    # Delete resources`,
    notes: [
      'IaC = version control for infrastructure',
      'Terraform = cloud-agnostic (AWS, Azure, GCP)',
      'Git workflow: code review → deploy'
    ],
    livePreview: false,
    practice: {
      title: 'Write Terraform Code',
      description: 'Define AWS EC2 + S3 in Terraform. Apply. Verify resources created.',
      hint: 'provider, resource aws_instance, resource aws_s3_bucket',
      solution: 'terraform init → main.tf (provider, aws_instance, aws_s3_bucket) → terraform apply'
    }
  },

  {
    id: 'terraform-intro',
    category: 'DevOps & Cloud',
    title: 'Terraform: Infrastructure as Code Tool',
    difficulty: 'Intermediate',
    theory: [
      'Terraform = IaC tool by HashiCorp. Write .tf files in HCL (HashiCorp Configuration Language). Define infrastructure, apply to create. Cloud-agnostic (AWS, Azure, GCP, etc).',
      'Workflow: Write code → terraform plan (preview) → terraform apply (create) → terraform state (track infrastructure). State file tracks real infrastructure (prevents duplicates).',
      'Best practices: Git version control, state file in remote backend (S3, Terraform Cloud), separate .tf files per environment (dev, staging, prod), variables for reusability.'
    ],
    code: `# Terraform Variables & Modules (variables.tf)

variable "environment" {
  type    = string
  default = "dev"
}

variable "instance_count" {
  type    = number
  default = 1
}

variable "instance_type" {
  type    = string
  default = "t2.micro"
}

# main.tf (use variables)
resource "aws_instance" "web" {
  count         = var.instance_count
  ami           = "ami-0a7cf821b91bcccbc"
  instance_type = var.instance_type
  tags = {
    Name        = "web-\${var.environment}-\${count.index}"
    Environment = var.environment
  }
}

# terraform.tfvars (override defaults)
environment    = "prod"
instance_count = 3
instance_type  = "t2.small"

# Apply with variables
terraform apply -var-file=terraform.tfvars

# Remote state (AWS S3)
terraform {
  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "prod/terraform.tfstate"
    region         = "ap-south-1"
    encrypt        = true
  }
}`,
    notes: [
      'Terraform = HCL-based IaC',
      'State file = record of infrastructure',
      'Variables = reusability across environments'
    ],
    livePreview: false,
    practice: {
      title: 'Create Reusable Terraform Module',
      description: 'Write module for AWS EC2 (configurable instance type, count). Use in main.tf.',
      hint: 'module definition → variables → outputs',
      solution: 'modules/ec2/ → main.tf, variables.tf, outputs.tf → use in root main.tf'
    }
  },

  {
    id: 'monitoring-cloud',
    category: 'DevOps & Cloud',
    title: 'Monitoring and Observability in Cloud',
    difficulty: 'Intermediate',
    theory: [
      'Monitoring = track metrics (CPU, memory, latency, errors). Observability = understand system behavior from outputs (logs, metrics, traces). "Observability > monitoring".',
      'Tools: Prometheus (metrics), Grafana (dashboards), ELK Stack (logs), Jaeger (traces). Cloud-native: CloudWatch (AWS), Azure Monitor, Stackdriver (GCP).',
      'Alerts: Notify on-call when issues occur. SLIs (Service Level Indicators) = measurable target (99.99% uptime). SLOs (Service Level Objectives) = goals (we aim for 99.99%).'
    ],
    code: `# AWS CloudWatch: Metrics & Alarms

# Enable detailed monitoring for EC2
aws ec2 monitor-instances --instance-ids i-123456

# Put custom metric (application performance)
aws cloudwatch put-metric-data \\
  --namespace MyApp \\
  --metric-name RequestLatency \\
  --value 250 \\
  --unit Milliseconds

# Create alarm (trigger if high latency)
aws cloudwatch put-metric-alarm \\
  --alarm-name HighLatency \\
  --alarm-description "Alert if latency > 1000ms" \\
  --metric-name RequestLatency \\
  --namespace MyApp \\
  --statistic Average \\
  --period 300 \\
  --threshold 1000 \\
  --comparison-operator GreaterThanThreshold \\
  --alarm-actions arn:aws:sns:ap-south-1:123456789:on-call

# Query logs (CloudWatch Insights)
aws logs start-query \\
  --log-group-name /aws/lambda/my-function \\
  --start-time 1609459200 \\
  --query-string 'fields @timestamp, @message | filter @message like /ERROR/ | stats count()'

# Prometheus config
global:
  scrape_interval: 15s
scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']`,
    notes: [
      'Monitoring = metrics (CPU, latency), Observability = logs + metrics + traces',
      'Alerting = on-call notification',
      'SLOs = reliability targets'
    ],
    livePreview: false,
    practice: {
      title: 'Setup Monitoring',
      description: 'Create CloudWatch dashboard: EC2 CPU, request count, error rate (mock).',
      hint: 'put-metric-data → CloudWatch dashboard → create alarm',
      solution: 'put-metric-data (CPU, requests, errors) → dashboard → put-metric-alarm'
    }
  },

  {
    id: 'cost-optimization',
    category: 'DevOps & Cloud',
    title: 'Cloud Cost Optimization Strategies',
    difficulty: 'Intermediate',
    theory: [
      'Cloud costs grow fast without discipline. Common mistakes: oversized instances, always-on dev servers, unattached storage, data transfer. Strategy: measure, rightsize, automate.',
      'Techniques: Reserved instances (AWS, 40% discount for 1-year commitment), Spot instances (70% discount, can terminate), auto-scaling (remove unused capacity), scheduled scaling (dev off during night).',
      'Tools: AWS Cost Explorer, Azure Cost Management, GCP Cost Analysis. Set budgets & alerts. Tag resources for cost allocation (project, team, environment).'
    ],
    code: `# AWS Cost Optimization

# 1. Reserved Instance (40% cheaper, 1-year commitment)
aws ec2 purchase-reserved-instances-offering \\
  --instance-count 3 \\
  --reserved-instances-offering-id bcf6fdcd-74f3-014d-fd33-4d89a0ac6985

# 2. Spot Instance (70% cheaper, can terminate)
aws ec2 request-spot-instances \\
  --spot-price "0.0235" \\
  --instance-count 1 \\
  --type "one-time" \\
  --launch-specification file://spot.json

# 3. Auto-scaling (scale down at night, weekend)
aws autoscaling create-launch-configuration \\
  --launch-configuration-name web-lc \\
  --image-id ami-0a7cf821b91bcccbc \\
  --instance-type t2.micro

aws autoscaling create-auto-scaling-group \\
  --auto-scaling-group-name web-asg \\
  --launch-configuration-name web-lc \\
  --min-size 1 \\
  --max-size 10 \\
  --desired-capacity 3

# 4. S3 Lifecycle (archive old objects to Glacier)
aws s3api put-bucket-lifecycle-configuration \\
  --bucket my-bucket \\
  --lifecycle-configuration file://lifecycle.json

# lifecycle.json:
{
  "Rules": [{
    "Id": "Archive",
    "Status": "Enabled",
    "Transitions": [{
      "Days": 30,
      "StorageClass": "GLACIER"
    }]
  }]
}

# 5. Delete unused resources
# Unattached EBS volumes, unused EC2 addresses, idle databases

# 6. Tag resources
aws ec2 create-tags \\
  --resources i-123456 \\
  --tags Key=Project,Value=MyApp Key=Environment,Value=Prod Key=CostCenter,Value=Engineering`,
    notes: [
      'Reserved Instances = 40% discount, 1-year commitment',
      'Spot Instances = 70% discount, can terminate',
      'Auto-scaling = remove unused capacity',
      'Lifecycle policies = archive old data (60% cheaper)'
    ],
    livePreview: false,
    practice: {
      title: 'Optimize Cloud Costs',
      description: 'Analyze your AWS bill. Identify 3 ways to save (reserved instances, lifecycle, auto-scaling).',
      hint: 'Cost Explorer → recommendations → implement',
      solution: 'Switch dev servers to Spot (70% off) → Archive S3 to Glacier after 30 days (60% off) → Auto-scale to 0 at night'
    }
  },

  // Security & Compliance (4 topics)
  {
    id: 'cloud-security-basics',
    category: 'Security & Compliance',
    title: 'Cloud Security Basics',
    difficulty: 'Intermediate',
    theory: [
      'Cloud security responsibility: Provider (infrastructure), Customer (application, data, access). AWS/Azure/GCP guarantee physical security; you handle app security.',
      'Practices: Encryption (data at rest, in transit), IAM (least privilege), network isolation (VPC, security groups), secrets management (never commit credentials), regular backups, intrusion detection.',
      'Vulnerabilities: Misconfigured storage (S3 public), weak credentials, unpatched software, DDoS attacks. Prevention: security audits, penetration testing, developer training.'
    ],
    code: `# Cloud Security Best Practices

# 1. Encryption at Rest (AWS KMS)
aws s3api put-bucket-encryption \\
  --bucket my-bucket \\
  --server-side-encryption-configuration '{
    "Rules": [{
      "ApplyServerSideEncryptionByDefault": {
        "SSEAlgorithm": "aws:kms",
        "KMSMasterKeyID": "arn:aws:kms:ap-south-1:123456789:key/12345678"
      }
    }]
  }'

# 2. Encryption in Transit (HTTPS)
aws s3api put-bucket-policy --bucket my-bucket --policy '{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "DenyUnencryptedObjectUploads",
    "Effect": "Deny",
    "Principal": "*",
    "Action": "s3:PutObject",
    "Resource": "arn:aws:s3:::my-bucket/*",
    "Condition": {
      "StringNotEquals": {
        "s3:x-amz-server-side-encryption": "aws:kms"
      }
    }
  }]
}'

# 3. IAM: Least Privilege
# Create role with minimal permissions
aws iam create-role --role-name lambda-execution-role
aws iam put-role-policy --role-name lambda-execution-role \\
  --policy-name lambda-s3-readonly \\
  --policy-document file://policy.json

# policy.json (S3 read-only, specific bucket)
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["s3:GetObject"],
    "Resource": "arn:aws:s3:::my-bucket-prod/*"
  }]
}

# 4. Secrets Management (AWS Secrets Manager)
aws secretsmanager create-secret \\
  --name prod/database-password \\
  --secret-string "MySecurePassword123"

# Retrieve secret in application
aws secretsmanager get-secret-value --secret-id prod/database-password

# 5. Network Security (VPC, Security Groups)
aws ec2 authorize-security-group-ingress \\
  --group-id sg-123456 \\
  --protocol tcp \\
  --port 443 \\
  --cidr 0.0.0.0/0  # HTTPS from anywhere

# Block HTTP (insecure)
# DO NOT open port 80 unless necessary`,
    notes: [
      'Cloud security = shared responsibility',
      'Encryption = data at rest + in transit',
      'Least privilege = minimal permissions needed',
      'Never commit secrets (use Secrets Manager)'
    ],
    livePreview: false,
    practice: {
      title: 'Secure S3 Bucket',
      description: 'Configure S3 bucket: encryption, block public access, enforce HTTPS, IAM access only.',
      hint: 'put-bucket-encryption, put-bucket-policy, block-public-access',
      solution: 'Enable default encryption (KMS) → Block public access → Deny non-HTTPS uploads → Restrict IAM'
    }
  },

  {
    id: 'shared-responsibility-model',
    category: 'Security & Compliance',
    title: 'Shared Responsibility Model',
    difficulty: 'Intermediate',
    theory: [
      'Shared Responsibility = divide security between cloud provider & customer. Provider (AWS): Physical security, infrastructure, hypervisor, network. Customer: OS patches, app code, IAM, data encryption (if desired).',
      'Example: RDS Database. AWS secures hardware, OS, backup. You secure: network access (security groups), credentials, SQL injection protection, data encryption at app level.',
      'Key principle: Provider responsibility increases as you move up the stack. IaaS (most customer work) → PaaS → SaaS (least customer work).'
    ],
    code: `# Shared Responsibility Examples

IaaS (EC2): You manage OS, patches, app security
├─ AWS: Hardware, hypervisor, network
└─ You: OS (patches, firewall), app code, secrets

PaaS (Lambda): AWS manages more
├─ AWS: Hardware, OS, runtime, scaling
└─ You: App code, secrets, IAM permissions

SaaS (Google Workspace): AWS manages almost everything
├─ Google: Hardware, OS, app patches, security
└─ You: Passwords, 2FA, data access permissions

# Recommended: Always assume breach
# Encryption + backup + monitoring prevent data loss
aws s3api get-bucket-versioning --bucket my-bucket
# Enable versioning (recover from accidental delete/corruption)
aws s3api put-bucket-versioning \\
  --bucket my-bucket \\
  --versioning-configuration Status=Enabled`,
    notes: [
      'Provider = infrastructure security',
      'Customer = application + data security',
      'IaaS = most customer responsibility',
      'SaaS = least customer responsibility'
    ],
    livePreview: false,
    practice: {
      title: 'Understand Responsibility',
      description: 'Create matrix: EC2 vs RDS vs Lambda. For each, list AWS vs Customer responsibility.',
      hint: 'EC2: you manage OS. RDS: AWS manages DB. Lambda: AWS manages runtime.',
      solution: 'EC2 (patches, firewall, app code yours) vs RDS (DB ops AWS) vs Lambda (runtime AWS)'
    }
  },

  {
    id: 'data-privacy-dpdp',
    category: 'Security & Compliance',
    title: 'Data Privacy: DPDP Act in India',
    difficulty: 'Intermediate',
    theory: [
      'DPDP Act (Digital Personal Data Protection Act) = India\'s data privacy law (effective 2023). Similar to GDPR. Key requirements: data localization (personal data stored in India), explicit consent, right to erasure, data minimization.',
      'For cloud users: Store personal data in India (AWS Mumbai, Azure Pune, GCP Delhi). Encrypt sensitive data. Maintain audit logs. Have privacy policy. Comply with erasure requests ("right to be forgotten").',
      'Penalties: Up to ₹500 crore or 5% revenue. Affects all companies handling Indian user data (Ola, Swiggy, Paytm, Indian startups). Critical for fintech, healthtech, edtech.'
    ],
    code: `# DPDP Compliance in AWS

# 1. Ensure data stored in India (Mumbai)
aws ec2 describe-regions --filter "Name=region-name,Values=ap-south-1"
# Always launch in ap-south-1 (Mumbai) for India personal data

# 2. Enable encryption for sensitive data
aws dynamodb create-table \\
  --table-name user-data \\
  --key-schema AttributeName=user_id,KeyType=HASH \\
  --attribute-definitions AttributeName=user_id,AttributeType=S \\
  --billing-mode PAY_PER_REQUEST \\
  --sse-specification Enabled=true,SSEType=KMS,KMSMasterKeyId=arn:aws:kms:ap-south-1

# 3. Logging & Audit trails
aws cloudtrail create-trail --name dpdp-audit --s3-bucket-name audit-logs

# 4. Data retention policy (delete after retention period)
aws s3api put-bucket-lifecycle-configuration \\
  --bucket user-data \\
  --lifecycle-configuration file://retention.json

# retention.json: Delete objects after 2 years (retention period)
{
  "Rules": [{
    "Id": "DataRetention",
    "Status": "Enabled",
    "Expiration": {"Days": 730}
  }]
}

# 5. Document privacy policy
# Include: What data collected, why, storage location (India), retention period, user rights

# 6. Implement right to erasure (GDPR/DPDP)
aws dynamodb delete-item \\
  --table-name user-data \\
  --key '{"user_id": {"S": "user-123"}}'`,
    notes: [
      'DPDP Act = India data privacy law',
      'Data localization = store in India (Mumbai region)',
      'Consent = explicit user permission required',
      'Right to erasure = delete data on request'
    ],
    livePreview: false,
    practice: {
      title: 'DPDP Compliance Checklist',
      description: 'For a fintech app, list 5 DPDP compliance requirements. Implement 2 in AWS.',
      hint: 'Data location, encryption, consent, audit logs, retention policy',
      solution: 'Store in Mumbai, encrypt sensitive data, get consent, enable CloudTrail, set S3 lifecycle (delete after 2 years)'
    }
  },

  {
    id: 'compliance-basics',
    category: 'Security & Compliance',
    title: 'Compliance Basics in Cloud',
    difficulty: 'Beginner',
    theory: [
      'Compliance = meeting regulatory requirements. Examples: HIPAA (healthcare), PCI-DSS (payments), SOC 2 (service organizations), ISO 27001 (information security).',
      'Cloud provider certifications: AWS (SOC 2, ISO 27001, PCI-DSS). Azure (SOC 2, HIPAA). GCP (SOC 2, ISO 27001). Doesn\'t mean you\'re compliant—you must implement controls.',
      'For India: DPDP Act, RBI guidelines (banking), MeitY (government). AWS Mumbai, Azure Pune, GCP Delhi are compliance-friendly. Compliance = responsibility shared between provider & customer.'
    ],
    code: `# Compliance Framework Check (AWS)

# 1. SOC 2 Compliance Check
# AWS provides SOC 2 Type II report
# Download from AWS Artifact portal (Management Console)

# 2. Enable CloudTrail (audit logs, required for compliance)
aws cloudtrail create-trail \\
  --name compliance-audit \\
  --s3-bucket-name compliance-logs \\
  --is-multi-region-trail \\
  --enable-log-file-validation

# 3. Enable Config (compliance monitoring)
aws configservice put-config-recorder \\
  --config-recorder-name compliance-recorder \\
  --role-arn arn:aws:iam::123456789:role/config-role

# 4. Check PCI-DSS Compliance (for payment processing)
# No password in code: Use Secrets Manager
aws secretsmanager create-secret \\
  --name payment-api-key \\
  --secret-string "{\"key\": \"sk_live_xxx\"}"

# 5. Document compliance (required by auditors)
# For each requirement:
# - How it\'s implemented (e.g., "Encryption via AWS KMS")
# - Evidence (e.g., CloudTrail logs, Config rules)
# - Responsible team

# 6. Regular audits
# Monthly: Review IAM permissions, enabled 2FA
# Quarterly: Penetration testing
# Annually: Full compliance audit`,
    notes: [
      'Compliance = meeting regulations',
      'Shared responsibility = provider + customer',
      'Audit trails = mandatory (CloudTrail, Config)',
      'Document everything for auditors'
    ],
    livePreview: false,
    practice: {
      title: 'Setup Compliance',
      description: 'Enable CloudTrail & Config for compliance audit. Document 3 controls (encryption, IAM, logging).',
      hint: 'CloudTrail → Config → document controls',
      solution: 'Enable CloudTrail (audit logs) → Config (compliance monitoring) → Document: encryption (KMS), IAM (roles), logging (CloudTrail)'
    }
  },

  // Cloud Career Path (3 topics)
  {
    id: 'cloud-certifications',
    category: 'Cloud Career Path',
    title: 'Cloud Certifications: AWS, Azure, GCP',
    difficulty: 'Beginner',
    theory: [
      'AWS Certifications: Cloud Practitioner (entry), Solutions Architect (associate/pro), Developer, SysOps Admin. Each level harder, higher salary.',
      'Azure Certifications: Azure Fundamentals, Administrator, Solutions Architect. Similar path to AWS.',
      'GCP Certifications: Cloud Digital Leader, Associate Cloud Engineer, Professional Data Engineer. Growing in popularity for data/ML roles.',
      'ROI: AWS certifications often lead to ₹8-25 LPA roles. Combines hands-on labs + exam prep. LinkedIn certified badge boosts visibility. Recommended: Start with Practitioner, then Associate Solutions Architect.'
    ],
    code: `# AWS Certification Path

1. AWS Cloud Practitioner (Entry-level)
   - Time: 6-8 weeks of study
   - Cost: ₹5,000 exam
   - Topics: Cloud basics, services overview, pricing, security
   - Job titles: Cloud support, cloud analyst

2. AWS Solutions Architect Associate
   - Time: 2-3 months
   - Cost: ₹5,000 exam
   - Topics: Design scalable, secure architectures on AWS
   - Job titles: Solutions architect (₹10-18 LPA)

3. AWS Solutions Architect Professional
   - Time: 3-4 months
   - Cost: ₹8,000 exam
   - Topics: Complex multi-service, multi-region designs
   - Job titles: Senior architect (₹15-25 LPA)

# Study resources:
# - Acloudguru (popular, interactive)
# - Linux Academy (hands-on labs)
# - AWS docs + practice exams
# - Udemy (affordable, ₹500-1000 courses)

# Tips:
# - Do hands-on labs (not just videos)
# - Practice exams until 85%+ score
# - Focus on services (EC2, S3, RDS, Lambda, VPC)
# - Join study groups (Reddit /r/aws, local meetups)`,
    notes: [
      'Cloud Practitioner = entry (6-8 weeks)',
      'Solutions Architect = popular (2-3 months)',
      'Combine study + hands-on labs',
      'LinkedIn badge = visibility boost'
    ],
    livePreview: false,
    practice: {
      title: 'Plan Certification Path',
      description: 'Choose: AWS, Azure, or GCP. Plan 6-month roadmap: Cloud Practitioner → Associate → Pro.',
      hint: 'Start with Practitioner, then Associate Architect',
      solution: 'Month 1-2: Cloud Practitioner (study + labs, exam) → Month 3-5: Solutions Architect (design focus) → Month 6: Pro (complex designs)'
    }
  },

  {
    id: 'cloud-jobs-india',
    category: 'Cloud Career Path',
    title: 'Cloud Jobs in India: Salaries, Companies, Skills',
    difficulty: 'Beginner',
    theory: [
      'Cloud roles exploding in India (Ola, Swiggy, Zomato, Razorpay, PharmEasy, Byju\'s, ShareChat). Salaries: Junior (₹6-12 LPA), Senior (₹15-30 LPA), Architect (₹20-50 LPA).',
      'Top hiring companies: AWS (Bangalore office), Infosys, TCS, Wipro (cloud consulting), startups (Ola, Swiggy, Amazon India). Top locations: Bangalore, Pune, Mumbai, Delhi, Hyderabad.',
      'In-demand skills: Kubernetes, Terraform, CI/CD, Python/Go, monitoring (Prometheus, ELK), security. Full-stack cloud engineer (infra + app code) commands premium salary.'
    ],
    code: `# Cloud Jobs in India: Salary Ranges (2024)

JUNIOR CLOUD ENGINEER (0-2 yrs)
- Salary: ₹6-12 LPA
- Skills: EC2, S3, RDS, basic DevOps
- Companies: Infosys, TCS, AWS, startups
- Roles: Cloud support engineer, AWS EC2 admin

SENIOR CLOUD ENGINEER (3-6 yrs)
- Salary: ₹15-30 LPA
- Skills: Multi-service architecture, Kubernetes, IaC, monitoring
- Companies: Ola, Swiggy, Zomato, Razorpay, PharmEasy
- Roles: DevOps engineer, Cloud architect, SRE

CLOUD ARCHITECT (6+ yrs)
- Salary: ₹25-50 LPA
- Skills: Multi-region design, security, compliance, cost optimization
- Companies: AWS, Microsoft, Google, large enterprises
- Roles: Solutions architect, Technical lead

# Top cloud jobs in India (2024):
# 1. Cloud Architect (Ola, Swiggy, PharmEasy)
# 2. DevOps Engineer (any startup, all major corps)
# 3. Site Reliability Engineer (Google, Amazon India)
# 4. Cloud Security Engineer (growing demand)
# 5. Data Engineer on Cloud (BigQuery, Redshift demand)

# Hiring trends:
# - Full-stack (infrastructure + app code) preferred
# - Kubernetes experience (10k+ jobs)
# - Python + Cloud = most valuable combo
# - Remote roles available (Bangalore rates even in Tier 2 cities)`,
    notes: [
      'Cloud roles exploding in India',
      'Junior: ₹6-12 LPA, Senior: ₹15-30 LPA',
      'Full-stack cloud engineer = premium salary',
      'Bangalore, Pune, Mumbai = top hubs'
    ],
    livePreview: false,
    practice: {
      title: 'Target Cloud Role',
      description: 'Identify 3 cloud jobs matching your interest. List required skills. Plan 6-month upskilling.',
      hint: 'LinkedIn job search, Dice, AngelList',
      solution: 'Cloud engineer (₹10-15 LPA) → DevOps engineer (₹15-25 LPA) → Architect (₹30-50 LPA). Upskill: AWS cert → Kubernetes → Design leadership'
    }
  },

  {
    id: 'cloud-learning-roadmap',
    category: 'Cloud Career Path',
    title: 'Cloud Learning Roadmap for Beginners',
    difficulty: 'Beginner',
    theory: [
      'Recommended path: Cloud fundamentals → Choose 1 cloud provider (AWS recommended) → IaC + DevOps → Specialization (Kubernetes, Security, Data).',
      'Time: 6 months (part-time) to 3 months (full-time) to junior level. 1-2 years to senior. 5+ years to architect.',
      'Skills progression: Compute (EC2) → Storage (S3) → Databases (RDS) → Networking (VPC) → CI/CD → Kubernetes → Security → Design (multi-service, global, resilient).'
    ],
    code: `# Cloud Learning Roadmap (6-Month Plan)

MONTH 1: Cloud Fundamentals
├─ Week 1-2: Cloud 101, IaaS vs PaaS vs SaaS, deployment models
├─ Week 3-4: Regions, availability zones, global infrastructure
└─ Hands-on: AWS free account, explore console

MONTH 2: AWS Compute & Storage
├─ EC2 (launch, security groups, key pairs)
├─ S3 (create bucket, upload, lifecycle)
├─ EBS (volumes, snapshots)
└─ Hands-on: Launch web server (EC2 + S3), serve static files

MONTH 3: AWS Networking & Databases
├─ VPC, subnets, security groups, NAT gateway
├─ RDS (create, backups, failover)
├─ Route53, CloudFront
└─ Hands-on: Multi-tier architecture (web, app, DB tiers)

MONTH 4: DevOps & IaC
├─ Git basics, GitHub
├─ Docker, Docker Compose
├─ CI/CD (GitHub Actions)
├─ Terraform (define infrastructure)
└─ Hands-on: Deploy web app via GitHub Actions → AWS

MONTH 5: Advanced DevOps
├─ Kubernetes basics (Pods, Deployments, Services)
├─ Monitoring (CloudWatch, Prometheus)
├─ Security (IAM, encryption, secrets)
├─ Cost optimization
└─ Hands-on: Deploy app to EKS, monitor, secure

MONTH 6: Specialization & Certification
├─ Choose specialization (Kubernetes, Security, Data)
├─ AWS Cloud Practitioner exam
├─ AWS Solutions Architect Associate (optional)
└─ Portfolio project (deploy real app)

# Learning resources:
# - ACloudiguru (interactive, ₹2000/year)
# - Linux Academy (hands-on labs)
# - AWS free tier (practice without cost)
# - YouTube: Kunal Kushwaha, TechWorld with Nana
# - Udemy (₹500 courses during sales)
# - Hands-on: Build, break, fix (learn from mistakes)`,
    notes: [
      'Month 1: Cloud fundamentals & concepts',
      'Month 2-3: Core AWS services (EC2, S3, RDS)',
      'Month 4-5: DevOps, IaC, Kubernetes',
      'Month 6: Certification + portfolio project'
    ],
    livePreview: false,
    practice: {
      title: 'Create Your Roadmap',
      description: 'Design 3-month learning plan for AWS cloud engineer role. Include topics, resources, hands-on projects.',
      hint: 'EC2/S3 → Docker → GitHub Actions → deploy app',
      solution: 'Month 1: EC2, S3, VPC, RDS basics → Month 2: Docker, GitHub Actions, Terraform → Month 3: Deploy e-commerce app (web + API + DB) via CI/CD'
    }
  }
];
