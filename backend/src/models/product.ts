import mongoose from 'mongoose';

interface IImage {
  fileName: string;
  originalName: string;
}

interface IProduct {
  title: string;
  image: IImage;
  category: string;
  description: string;
  price: number | null;
}

const imageSchema = new mongoose.Schema<IImage>({
  fileName: {
    type: String,
    required: [true, "Поле 'fileName' обязательно"],
  },
  originalName: {
    type: String,
    default: 'productImage',
  },
});

const productSchema = new mongoose.Schema<IProduct>({
  title: {
    type: String,
    required: [true, "Поле 'title' должно быть заполнено"],
    unique: true,
    minlength: [2, 'Минимальная длина полня "title" - 2'],
    maxlength: [30, 'Максимальная длина полня "title" - 30'],
  },
  image: {
    type: imageSchema,
    required: [true, 'поле "image" обязательно'],
  },
  category: {
    type: String,
    required: [true, 'поле "category" обязательно'],
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    default: null,
  },
});

export default mongoose.model<IProduct>('product', productSchema);
