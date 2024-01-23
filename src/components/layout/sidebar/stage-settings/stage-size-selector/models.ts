export const types = ["GPT-3", "Codex"] as const;

export type ModelType = (typeof types)[number];

export interface Model<Type = string> {
  id: string;
  name: string;
  description: string;
  image: string;
  type: Type;
}

export const models: Model<ModelType>[] = [
  {
    id: "1",
    name: "Demie (S)",
    description:
      "Most capable GPT-3 model. Can do any task the other models can do, often with higher quality, longer output and better instruction-following. Also supports inserting completions within text.",
    type: "GPT-3",
    image: "/bottle-images/bouteille-demie.png",
  },
  {
    id: "2",
    name: "Bouteille (M)",
    image: "/bottle-images/bouteille-standard.png",
    description: "Very capable, but faster and lower cost than Davinci.",
    type: "GPT-3",
  },
  {
    id: "3",
    name: "Magnum (L)",
    image: "/bottle-images/bouteille-magnum.png",
    description: "Capable of straightforward tasks, very fast, and lower cost.",
    type: "GPT-3",
  },
];
