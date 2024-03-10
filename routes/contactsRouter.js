import express from "express";
import contactsController from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import schemas from "../schemas/contactsSchemas.js";
import { isValidId } from "../middlewares/isValidId.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAllContacts);

contactsRouter.get("/:id", isValidId, contactsController.getOneContact);

contactsRouter.delete("/:id", isValidId, contactsController.deleteContact);

contactsRouter.post(
  "/",
  validateBody(schemas.createContactSchema),
  contactsController.createContact
);

contactsRouter.put(
  "/:id",
  isValidId,
  validateBody(schemas.updateContactSchema),
  contactsController.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateStatusContactSchema),
  contactsController.updateStatusContact
);

export default contactsRouter;
