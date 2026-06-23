# Candidate Intake Validation & Creation Status

## Task Overview
Utkrusht's HR recruiting API lets hiring teams register candidates into the pipeline through a create-candidate endpoint. Right now that endpoint trusts whatever JSON it receives, so candidates with a blank name, a broken email, or a negative experience value slip through, and a numeric field meant to be a number is stored as text. A companion list endpoint then returns these unclean records to downstream recruiter screens. This matters because recruiter dashboards and analytics rely on clean, well-typed candidate records and conventional HTTP semantics.

## Objectives
- Ensure only candidates with a non-empty name, a valid email, and a non-negative whole number of experience years are accepted.
- Ensure malformed or incomplete candidate submissions are rejected with a clear client error response.
- Ensure the experience value is stored as a true numeric value rather than text.
- Ensure a successful candidate creation responds with the conventional status for a newly created resource.
- Keep request handling in the controller and persistence behavior in the service.

## Helpful Tips
- Consider how NestJS can validate and shape an incoming request body before it ever reaches your handler logic.
- Think about what global request-processing configuration must be active for body constraints to actually be enforced, including inside the test application.
- Explore how an incoming JSON field can be coerced into the type your store expects.
- Review which HTTP status code conventionally represents a successfully created resource.
- Analyze the boundary between routing concerns and business behavior so each layer keeps its responsibility.

## How to Verify
- Run `npm test` and confirm the provided specification passes.
- Send a valid candidate payload to the create endpoint and confirm the response status is 201 and the body reflects the stored record.
- Send a payload with a missing name, an invalid email, or a negative experience value and confirm the response status is 400.
- Inspect a stored candidate via the list endpoint and confirm `experienceYears` is a number, not a string.
