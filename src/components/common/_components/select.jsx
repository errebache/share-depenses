import React, { forwardRef } from "react";
import Select, { components } from "react-select";

const groupStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "left",
};

const groupBadgeStyles = {
  backgroundColor: "#EBECF0",
  borderRadius: "2em",
  color: "#172B4D",
  display: "inline-block",
  fontSize: 12,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.16666666666667em 0.5em",
  textAlign: "center",
};

const noImageStyles = {
  width: "24px",
  height: "24px",
  backgroundColor: "green",
  borderRadius: "50%",
  marginRight: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
};

const getBackgroundColor = (char) => {
  const hash = char.charCodeAt(0) % 360;
  return `hsl(${hash}, 70%, 80%)`;
};

const OptionWithIcon = ({ data, ...props }) => (
  <components.Option {...props}>
    <div style={{ display: "flex", alignItems: "center" }}>
      {data.icon && (
        <img
          src={data.icon}
          alt={data.label}
          style={{ width: "24px", height: "24px", marginRight: "10px" }}
        />
      )}
      <span>{data.label}</span>
    </div>
  </components.Option>
);

const OptionWithImage = ({ data, ...props }) => (
  <components.Option {...props}>
    <div style={{ display: "flex", alignItems: "center" }}>
      {data.image ? (
        <img
          src={data.image}
          alt={data.label}
          style={{
            width: "24px",
            height: "24px",
            marginRight: "10px",
            borderRadius: "50%",
          }}
        />
      ) : (
        <div
          style={{
            ...noImageStyles,
            backgroundColor: getBackgroundColor(data.label.charAt(0)),
          }}
        >
          {data.label.charAt(0)}
        </div>
      )}
      <span>{data.label}</span>
    </div>
  </components.Option>
);

const formatGroupLabel = (data) => (
  <div className="form-control" style={groupStyles}>
    <span>{data.value}</span>
    <span style={groupBadgeStyles}>{data.currencyOptions.length}</span>
  </div>
);

const customSingleValue = forwardRef(({ children, ...props }, ref) => {
  let firstLetter = "";
  if (props && props.data && props.data.label && props.data.label) {
    firstLetter = props.data.label.charAt(0);
  }
  const backgroundColor = getBackgroundColor(firstLetter);

  if (props.data.image) {
    return (
      <components.SingleValue {...props} ref={ref}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={props.data.image}
            alt={props.data.label}
            style={{
              width: "24px",
              height: "24px",
              marginRight: "10px",
              borderRadius: "50%",
            }}
          />
          {children}
        </div>
      </components.SingleValue>
    );
  } else {
    return (
      <components.SingleValue {...props} ref={ref}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ ...noImageStyles, backgroundColor }}>{firstLetter}</div>
          {children}
        </div>
      </components.SingleValue>
    );
  }
});

const SelectComponent = forwardRef(({ options, type }, ref) => {
  const getOptionComponent = (type) => {
    switch (type) {
      case "icon":
        return OptionWithIcon;
      case "image":
        return OptionWithImage;
      default:
        return components.Option;
    }
  };

  const OptionComponent = getOptionComponent(type);

  return (
    <Select
      ref={ref}
      defaultValue={options[1]}
      options={options}
      formatGroupLabel={formatGroupLabel}
      components={{ Option: OptionComponent, SingleValue: customSingleValue }}
      isSearchable={true}
    />
  );
});

export default SelectComponent;
