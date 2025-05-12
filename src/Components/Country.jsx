const Country = (props) => {
  return (
    <tr>
      <td className="px-4 py-2">
        <img className="" src={props.flag} alt="country flag" />
      </td>
      <td className="px-4 py-2">{props.name}</td>
      <td className="px-4 py-2">{props.population}</td>
      <td className="px-4 py-2">{props.area}</td>
      <td className="px-4 py-2">{props.region}</td>
    </tr>
  );
};

export default Country;
