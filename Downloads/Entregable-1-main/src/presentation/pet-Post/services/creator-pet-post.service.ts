import { PetPost, User } from "../../../data";
import { CustomError } from "../../../domain/errors";

export class CreatorPetPostService {

  async execute(data: any, user: User) {  // ✅ cambia el nombre del parámetro a "user"
    const petPost = new PetPost();

    petPost.petName = data.petName.trim().toLowerCase();
    petPost.description = data.description.trim().toLowerCase();
    petPost.image_url = data.imagen_url;
    petPost.user = user; // ✅ asignar el usuario autenticado

    try {
      return await petPost.save();
    } catch (error) {
      throw CustomError.internalServer('internal server error');
    }
  }
}
