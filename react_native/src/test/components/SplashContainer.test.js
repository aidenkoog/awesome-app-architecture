import { render } from '@testing-library/react'

import SplashContainer from '../../presentation/containers/splash/SplashContainer'

describe('SplashContainer test', () => {
    it('should render SplashContainer', () => {
        render(<SplashContainer />);
    });
});