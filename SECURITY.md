# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.x     | :white_check_mark: |
| < 2.0   | :x:                |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues, discussions, or pull requests.**

Instead, please use one of the following channels:

- **GitHub Private Vulnerability Reporting**: [Report a vulnerability](https://github.com/matt765/spireflow/security/advisories/new)
- **Email**: mateusz.wyrebek@gmail.com

### What to Include

- Description of the vulnerability
- Steps to reproduce
- Affected components or files (if known)
- Potential impact

### What to Expect

- **Acknowledgment** within 72 hours
- **Assessment and fix** timeline communicated after initial review
- **Credit** in the release notes (with your consent) once the fix is published

## Scope

### In Scope

- XSS or injection vulnerabilities in components
- Insecure default configurations shipped with the template
- Vulnerable dependencies (npm packages)
- Client-side data exposure risks

### Out of Scope

- Vulnerabilities in user-modified code or custom deployments
- Security of third-party services users integrate on their own
- The optional backend (reported separately at [spireflow-backend](https://github.com/matt765/spireflow-backend))
- Missing features that are not part of the project's scope
