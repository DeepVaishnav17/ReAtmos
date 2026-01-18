## Authentication & Security

The application uses JWT-based authentication.

### Current Implementation
- Access tokens issued on login
- Tokens verified via middleware on protected routes
- OAuth users must complete profile before access
- Token tampering handled via silent logout

### Security Considerations
- Short-lived JWTs
- Protected backend routes
- Role-based access support

### Future Improvements
- Migrate JWT storage to httpOnly cookies
- Add refresh token rotation
- Integrate Amazon SES for email delivery
