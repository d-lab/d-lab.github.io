import React from 'react';

type OrganizationUrls = {
    [key: string]: string;
  };
  
  export const organizationUrls: OrganizationUrls = {
    'POLIMI': 'https://www.polimi.it/en',
    'ML cube': 'https://www.mlcube.com',
    'The University of Queensland': 'https://www.uq.edu.au'
  };
  
  export const renderOrganizationName = (name: string): React.ReactNode => {
    for (const [org, url] of Object.entries(organizationUrls)) {
      if (name.includes(org)) {
        const parts = name.split(org);
        return (
          <>
            {parts[0]}
            <a 
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {org}
            </a>
            {parts[1]}
          </>
        );
      }
    }
    return name;
  };