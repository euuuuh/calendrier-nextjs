/**
 * Type representant un événement
 * @important Doit suivre le même shéma que la table "events" dans la base de données (voir le fichier "prisma/schema.prisma")
 */
export type TypeEvent = {
  /**
   * Identifiant de l'événement
   */
  event_id: string;

  /**
   * Date de création de l'événement
   */
  event_creation_date: Date;

  /**
   * Date et heure de début de l'événement
   */
  event_start: Date;

  /**
   * Date et heure de fin de l'événement
   */
  event_end: Date;

  /**
   * Le titre de l'événement
   */
  title: string;

  /**
   * description de l'événement
   */
  description: string;

  /**
   * True si complété
   */
  is_completed: boolean;

  /**
   * Localisation de l'événement
   * @optional
   */
  location: string | null;
};
