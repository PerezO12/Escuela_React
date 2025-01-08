import PropTypes from 'prop-types';

const MenuButton = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
  >
    {children}
  </button>
);

MenuButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default MenuButton;
