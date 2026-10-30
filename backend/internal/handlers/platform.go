package handlers

import (
    "github.com/gofiber/fiber/v2"
    "karecik/backend/internal/middleware"
    "karecik/backend/internal/repository"
    "karecik/backend/internal/utils"
)

// PlatformBusinesses lists only cafeterias that the authenticated operator
// is authorized to see. This is read-only: creating or switching tenant
// context requires separate, carefully scoped endpoints.
func (h *Handler) PlatformBusinesses(c *fiber.Ctx) error {
    userID := middleware.UserID(c)
    role, err := repository.PlatformRole(c.Context(), h.DB, userID)
    if err != nil { return utils.Internal(c, err) }
    if role == "" { return utils.Fail(c, fiber.StatusForbidden, "FORBIDDEN", "Acesso restrito à equipe administradora.") }

    rows, err := h.DB.Query(c.Context(), `
        SELECT b.id, b.name, b.slug
        FROM businesses b
        WHERE $1 = 'admin' OR EXISTS (
           SELECT 1 FROM platform_staff_businesses a
           WHERE a.staff_user_id = $2 AND a.business_id = b.id
        )
        ORDER BY lower(b.name), b.id
        LIMIT 500
    `, role, userID)
    if err != nil { return utils.Internal(c, err) }
    defer rows.Close()

    items := make([]fiber.Map, 0)
    for rows.Next() {
        var id, name, slug string
        if err := rows.Scan(&id, &name, &slug); err != nil { return utils.Internal(c, err) }
        items = append(items, fiber.Map{"id":id,"name":name,"slug":slug})
    }
    if err := rows.Err(); err != nil { return utils.Internal(c, err) }
    return utils.OK(c, fiber.Map{"role":role,"businesses":items})
}
