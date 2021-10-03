import { byTestId, createComponentFactory } from "@ngneat/spectator/jest";
import { ProgressComponent } from "./progress.component";

describe('ProgressComponent', () => {

  const createComponent = createComponentFactory(ProgressComponent);

  it('should create', () => {
    const spectator = createComponent();
    expect(spectator).toBeTruthy();
  });

  it('should render as much circles as input provide', () => {
    const numberOfCircles = 5;
    const spectator = createComponent({
      props: {
        max: numberOfCircles
      }
    });
    expect(spectator.queryAll(byTestId('progress-element'))).toHaveLength(numberOfCircles);
  });

  it('should feature the specified number of circles', () => {
    const props = {
      max: 5,
      value: 3,
    };
    const spectator = createComponent({ props });
    expect(spectator.queryAll('[data-checked="true"]'))
      .toHaveLength(props.value);

  })
});
