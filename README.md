# Four Horrible Lambdas

A demonstration of some awful things you can do if you give your Lambda's role full access to the Lambda API.

All of these require the `LambdaFullAccess` managed policy.

# UpdateOwnEnv

This Lambda updates one of its own environment variables.

# UpdateOwnCode

This Lambda replaces its own code.

# Seppuku

This Lambda deletes itself from AWS.

# SelfReplicate

This Lambda creates a copy of itself in the same acct/region.

# GreyGoo

This Lambda creates two copies of itself in the same acct/region, then invokes them.

It panics and exits if the account/region already contains more than 100 Lambda functions, because I'm not completely evil.
