import { render, screen } from '@testing-library/react';
import UpdateAccountFields from '../../components/AdminAccountManagement/UpdateAccountFields';

test('renders without crashing', () => {
  render(<UpdateAccountFields />);
});
