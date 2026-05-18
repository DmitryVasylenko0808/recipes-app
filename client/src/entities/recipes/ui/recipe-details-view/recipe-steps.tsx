import { Card, Typograpghy } from '@/shared';

type RecipeStepsProps = { steps: string[] };

export const RecipeSteps = ({ steps }: RecipeStepsProps) => {
  return (
    <Card className="p-6">
      <Typograpghy tagVariant="h2" className="mb-5">
        Cooking steps
      </Typograpghy>
      <div className="space-y-5">
        {steps.map((step, i) => (
          <div key={i}>
            <Typograpghy tagVariant="h3" className="mb-2 font-semibold">
              Step {i + 1}
            </Typograpghy>
            <Typograpghy tagVariant="p">{step}</Typograpghy>
          </div>
        ))}
      </div>
    </Card>
  );
};
