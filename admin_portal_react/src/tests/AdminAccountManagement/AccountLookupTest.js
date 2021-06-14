import { render, screen } from '@testing-library/react';
import Account from '../../components/AdminAccountManagement/Account';

test('renders without crashing', () => {
  render(<Account />);
});
