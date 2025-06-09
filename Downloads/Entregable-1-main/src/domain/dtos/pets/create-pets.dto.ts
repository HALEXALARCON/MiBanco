export class CreatePetDto {
  constructor(
    public readonly petName: string,
    public readonly description: string,
    public readonly imagen_url: string
  ) { }

  static execute(object: { [key: string]: any }): [string?, CreatePetDto?] {
    const { petName, description, imagen_url } = object;
    console.log(object)

    if (!petName) return ['Pet name is required'];
    if (!description) return ['Description is required'];
    if (!imagen_url) return ['Image URL is required'];

    return [
      undefined,
      new CreatePetDto(
        petName.trim(),
        description.trim(),
        imagen_url.trim()
      )
    ];
  }
}
