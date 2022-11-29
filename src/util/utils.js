const disableButton = (props) => props.some((prop) => !prop);
const isPartyPlace = (userType) => userType === 'party_place' ?? false;

export { disableButton, isPartyPlace };
