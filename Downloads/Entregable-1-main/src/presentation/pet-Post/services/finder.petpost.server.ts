import { PetPost, petPostStatus } from "../../../data";
import { CustomError } from "../../../domain/errors";
import { instanceToPlain } from "class-transformer";

export class FinderPetPostService {

  async executeByFindAll() {

    const petPosts = await PetPost.find({
      where: {
        status: petPostStatus.APPROVED,
        hasFound: false,
      },
      relations: {
        user: true,
      },
      select: {
        id: true,
        petName: true,
        description: true,
        image_url: true,
        status: true,
        hasFound: true,
        user: {
          id: true,
          name: true,
          email: true,
        },
      },
    });

    return instanceToPlain(petPosts); // <-- Aplica Exclude()
  }

  async executeByFindOne(id: string) {
    const petPost = await PetPost.findOne({
      where: { id },
      relations: {
        user: true,
      },
      select: {
        id: true,
        petName: true,
        description: true,
        image_url: true,
        status: true,
        hasFound: true,
        created_at: true,
        user: {
          id: true,
          name: true,
          email: true,
        },
      },
    });

    if (!petPost) {
      throw CustomError.notFound('pet not found');
    }

    return instanceToPlain(petPost); // <-- Aplica Exclude()
  }
}
