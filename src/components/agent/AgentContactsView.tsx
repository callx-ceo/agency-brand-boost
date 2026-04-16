import React, { useState } from "react";
import { ContactItem, mockContacts } from "./contacts/contactData";
import ContactsList from "./contacts/ContactsList";
import ContactDetail from "./contacts/ContactDetail";

const AgentContactsView = () => {
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(null);

  if (selectedContact) {
    return (
      <ContactDetail
        contact={selectedContact}
        onBack={() => setSelectedContact(null)}
      />
    );
  }

  return (
    <ContactsList
      contacts={mockContacts}
      onSelectContact={setSelectedContact}
    />
  );
};

export default AgentContactsView;
