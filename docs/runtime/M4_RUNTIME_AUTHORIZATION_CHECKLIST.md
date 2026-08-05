# M4 Runtime Authorization Checklist

## Use and Stop Boundary

This checklist is a pre-execution governance aid. Checking preparation items
does not authorize database access or command dispatch. Every checked item must
reference current, immutable, target-bound external evidence reviewed under the
M4.0.5 version-2 contracts. Any unchecked, expired, mismatched, or unverifiable
item keeps authorization fail-closed.

Current checklist state: **0 evidence instances acquired; all items unchecked**.

## Package and Target Preconditions

- [ ] Repository source identity is fixed to the reviewed commit and migration order.
- [ ] A Target Identity Evidence is approved and bound to one operation and target.
- [ ] The external Evidence Package v2 manifest and Authorization Record v2 are immutable and schema-valid.
- [ ] Package, component, evidence-record, and command-set SHA-256 bindings match.
- [ ] All timestamps, validity periods, dependency chronology, and approval expiry checks pass.
- [ ] Secret-exclusion review confirms that no credential-bearing value or backup content is present.

## Security

### Credential Governance

- [ ] B Credential Governance Evidence identifies the named Credential Owner.
- [ ] External secret custody and approved injection references are present without exposing a secret.
- [ ] Rotation, revocation, and exposure-response lifecycle evidence is current.
- [ ] Security Authority approval is immutable, valid, and bound to the target and operation.

### Identity Validation

- [ ] C Migration Identity Evidence identifies the named Database Security Owner.
- [ ] M4.0.4.4.6.10 has separate explicit named human authorization.
- [ ] Migration identity, approved host restrictions, and authentication policy are target-bound.
- [ ] Authentication compatibility, provisioning completion, and post-validation references are present.
- [ ] Migration identity remains separate from application and administrator identities.

### Permission Validation

- [ ] D Privilege Evidence contains an approved target-schema-only allowlist.
- [ ] Global, account-management, grant-option, replication, shutdown, file, and unrelated-schema privileges are explicitly excluded.
- [ ] The privilege manifest has an independent verification reference.
- [ ] Security Authority approval is current and digest-bound.

## Operations

### Backup Confirmation

- [ ] E Operational Safety Evidence identifies the exact target-bound backup artifact.
- [ ] Backup storage, retention, size, integrity hash, verification time, and responsible owner are evidenced.
- [ ] Backup Owner approval is current and target-bound.

### Recovery Confirmation

- [ ] Restore runbook and named Restore Operator are recorded.
- [ ] Restore validation evidence is current and bound to the same target.
- [ ] Partial-failure and escalation procedures are approved.

### Rollback Confirmation

- [ ] Named Rollback Authority is confirmed.
- [ ] Rollback procedure and non-empty stop conditions are approved.
- [ ] Rollback and restore evidence remain valid for the proposed execution window.

## Authorization

### Operator Approval

- [ ] F Human Authorization Evidence identifies the named Approved Operator and role.
- [ ] The Human Approving Authority and approval reference are named and immutable.
- [ ] The change reference, exact command allowlist, escalation contact, and stop conditions are complete.
- [ ] An Authorized Release Owner is present when controlled production execution applies.

### Execution Window

- [ ] Maintenance-window start and end are explicit and chronologically valid.
- [ ] Approval timestamp and expiry cover only the bound execution window.
- [ ] Target, source commit, migration set, operator, approver, command set, and evidence digests are unchanged since approval.

### Final Authorization

- [ ] All applicable A-F evidence records are valid and independently approved.
- [ ] The entry-condition or live-validation component required by the requested gate is valid and target-bound.
- [ ] A superseding immutable package records the approved transition from `BLOCKED` to the exact requested readiness state.
- [ ] The Runtime Authorization Governance Reviewer records the final read-only readiness decision.
- [ ] A separate authorized dispatch decision exists and is still valid at execution time.

## Automatic Blocking Conditions

Keep the package `BLOCKED` when any checklist item required by the requested
gate is unchecked, or when an instance is missing, stale, mutable, unapproved,
target-mismatched, digest-mismatched, expired, secret-bearing, or outside its
approved command scope. Administrator access, an open port, local
configuration, CI PASS, static validation, or a completed template cannot
satisfy an unchecked item.

```text
Evidence acquired: 0 / 6
Security readiness: NOT READY
Operational readiness: NOT READY
Authorization readiness: NOT READY
READY_FOR_LIVE_VALIDATION: NO
READY_FOR_CONTROLLED_EXECUTION: NO
READY FOR HUMAN EXECUTION: NO
Final decision: NOT AUTHORIZED
```

Continue: **Freeze First -> Validate Second -> Execute Last**.
