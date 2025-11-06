# Security Policy

## Supported Versions

We currently support security updates for the latest production release. When
critical vulnerabilities are discovered, a patch release will be published and
communicated via the project's release notes.

| Version | Supported |
|---------|-----------|
| latest  | ✅ |

## Reporting a Vulnerability

We take the security of this project seriously. If you discover a security
vulnerability, please follow the guidelines below to help us resolve the issue
responsibly.

1. **Do not open a public issue**. Instead, email the maintainer directly at
   [security@salah.uz](mailto:security@salah.uz) with the details of the
   vulnerability.
2. Include as much information as possible:
   - Steps to reproduce or proof-of-concept
   - Potential impact
   - Any suggested mitigation or patch
3. You should receive acknowledgment within **48 hours**. We aim to provide an
   initial assessment and timeline for resolution within **5 business days**.

## Disclosure Policy

- We follow a responsible disclosure model. Please allow the team adequate time
  to investigate and release a fix before public disclosure.
- Once a fix or mitigation is available, we will publish details in the release
  notes and credit the reporter (unless anonymity is requested).

## Security Best Practices

As a user or contributor, please consider the following best practices:

- Keep dependencies up to date by running `yarn audit` and reviewing pull
  requests that update packages.
- Use environment variables for secrets. Never commit secrets to version
  control.
- Review code changes for potential injection vectors, XSS, CSRF, or other
  common web vulnerabilities.
- Enable two-factor authentication (2FA) on GitHub and any related services.

## Contact

For all security matters, contact **security@salah.uz**.
