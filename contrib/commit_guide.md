

## Commit Guide

**PRs** where one or more commits fail to comply with the definitions specified in this documentation,
especially those marked with the **MUST** keyword, will be rejected with a feedback.

All commits MUST follow the syntax : 

```
<message> -> <tag>
```
where 

- message: Is the commit message and **MUST** be between 0 and 1024 characters in length. If the author does 
           not intend to add a commit message, He/She **MUST** set the message field to `0`.

- tag: Is a descriptor pointing out a hint of what the changes might be about. These descriptors can
       only be the following: `bug`, `mod`, `new`, `nil`. use the  `bug` tag when the changes made relates
       more to a bug fix, the `mod` tag when the changes made are random modifications to the specific sub project's
       existing features, the `new` tag when the changes made intends to add non-existing 
       features to the sub-project, and use the `nil` tag when the message is `0`.
