package repository

import (
    "context"

    "github.com/google/uuid"
)

// PlatformRole reports the enabled central staff role for a user.
// A missing or disabled record grants no privilege.
// This helper does not modify the authenticated session's business scope.
func PlatformRole(ctx context.Context, db DB, userID uuid.UUID) (string, error) {
    var role string
    err := db.QueryRow(ctx, `
        SELECT role FROM platform_staff
        WHERE user_id = $1 AND enabled = true
    `, userID).Scan(&role)
    if isNoRows(err) {
        return "", nil
    }
    if err != nil {
        return "", err
    }
    return role, nil
}

// CanManagePlatformBusiness checks the explicit server-side assignment.
// Admins may manage all businesses; editors may manage assigned businesses only.
// A user who merely knows a business UUID has no special access.
func CanManagePlatformBusiness(ctx context.Context, db DB, userID, businessID uuid.UUID) (bool, error) {
    var allowed bool
    err := db.QueryRow(ctx, `
        SELECT EXISTS (
            SELECT 1 FROM platform_staff s
            WHERE s.user_id = $1 AND s.enabled = true
            AND (
                s.role = 'admin'
                OR (s.role = 'editor' AND EXISTS (
                    SELECT 1 FROM platform_staff_businesses a
                    WHERE a.staff_user_id = s.user_id AND a.business_id = $2
                ))
            )
        )
    `, userID, businessID).Scan(&allowed)
    if err != nil {
        return false, err
    }
    return allowed, nil
}
