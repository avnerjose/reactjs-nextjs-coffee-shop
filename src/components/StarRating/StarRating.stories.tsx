import { StarRating as StarRatingComponent } from ".";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  component: StarRatingComponent,
} as ComponentMeta<typeof StarRatingComponent>;

export const StartRating: ComponentStory<typeof StarRatingComponent> = (
  args
) => <StarRatingComponent {...args} />;

StartRating.args = {
  rating: 4,
};
