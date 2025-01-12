import PropTypes from 'prop-types';

const FormularioRead = ({
    elementos = [],
}) => {
  return (
    <div className="space-y-6">
        {elementos.map((elemento, index) => (
            <div key={index}>
                <p className="text-lg font-medium text-gray-800">{elemento.titulo}:</p>
                <p className="text-gray-700">{elemento.valor}</p>
            </div>
        ))}
    </div>
  );
};

FormularioRead.propTypes = {
  elementos: PropTypes.arrayOf(
    PropTypes.shape({
      titulo: PropTypes.string.isRequired,
      valor: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node]).isRequired, // Valor asociado al título
    })
  ).isRequired,
};

export default FormularioRead;
