/**
 * Base Template Utilities
 * Provides common functionality for all templates
 */

import React from 'react';

/**
 * Common data processors for templates
 */
export const DataProcessors = {
  // Process company data with fallbacks
  processCompany: (data) => ({
    name: data?.company?.name || "Your Company",
    tagline: data?.company?.tagline || "Professional Services",
    logo: data?.company?.logo || null,
    initial: (data?.company?.name || "C").charAt(0).toUpperCase()
  }),

  // Process client data with fallbacks
  processClient: (data) => ({
    name: data?.client?.name || "Client Name",
    email: data?.client?.email || "",
    phone: data?.client?.phone || "",
    address: data?.client?.address || "",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }),

  // Process project scope into paragraphs for pagination
  processScope: (data) => {
    const scopeRaw = (data?.project?.scope || "").trim();
    return scopeRaw
      ? scopeRaw.split(/\n{2,}/).map(s => s.trim()).filter(Boolean)
      : [];
  },

  // Process pricing items from text format
  processPricing: (data) => {
    const itemsRaw = data?.pricing?.items || "";
    const items = itemsRaw
      ? itemsRaw.split(/\r?\n/).map(line => {
          const [description, ...rest] = line.split(/—|-/);
          const price = rest.join("-").trim();
          return { 
            description: (description || "").trim(), 
            price: price || "" 
          };
        }).filter(item => item.description)
      : [];

    return {
      items,
      total: data?.pricing?.total || "800€",
      validUntil: data?.pricing?.validUntil || "2025-08-21"
    };
  }
};

/**
 * Common UI Components for templates
 */
export const TemplateComponents = {
  // Company logo/initial component
  CompanyLogo: ({ company, colors, size = "lg" }) => {
    const sizeClasses = {
      sm: "w-8 h-8 text-sm",
      md: "w-10 h-10 text-base", 
      lg: "w-12 h-12 text-xl"
    };

    return (
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-${colors.primary} to-${colors.secondary} rounded-lg flex items-center justify-center`}>
        {company.logo ? (
          <img src={company.logo} alt={company.name} className="w-full h-full object-cover rounded-lg" />
        ) : (
          <span className="text-white font-bold">
            {company.initial}
          </span>
        )}
      </div>
    );
  },

  // Section header with accent line
  SectionHeader: ({ title, colors, className = "" }) => (
    <div className={`flex items-center gap-3 mb-6 ${className}`}>
      <div className={`h-6 w-1 bg-${colors.primary} rounded-full`}></div>
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
    </div>
  ),

  // Pricing table component
  PricingTable: ({ pricing, colors }) => (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <table className="w-full">
        <thead>
          <tr className={`bg-gradient-to-r from-${colors.primary} to-${colors.secondary} text-white`}>
            <th className="px-6 py-4 text-left font-semibold">Service Description</th>
            <th className="px-6 py-4 text-right font-semibold">Investment</th>
          </tr>
        </thead>
        <tbody>
          {pricing.items.length > 0 ? (
            pricing.items.map((item, index) => (
              <tr key={index} className={`border-b border-gray-100 hover:bg-${colors.accent}`}>
                <td className="px-6 py-4 text-gray-700">{item.description}</td>
                <td className="px-6 py-4 text-right font-semibold text-gray-800">
                  {item.price}
                </td>
              </tr>
            ))
          ) : (
            <>
              <tr className="border-b border-gray-100">
                <td className="px-6 py-4 text-gray-700">Professional Services</td>
                <td className="px-6 py-4 text-right font-semibold text-gray-800">500€</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="px-6 py-4 text-gray-700">Additional Support</td>
                <td className="px-6 py-4 text-right font-semibold text-gray-800">300€</td>
              </tr>
            </>
          )}
        </tbody>
        <tfoot>
          <tr className={`bg-gradient-to-r from-gray-100 to-${colors.accent}`}>
            <td className="px-6 py-4 font-bold text-gray-800">Total Investment</td>
            <td className="px-6 py-4 text-right font-bold text-lg text-gray-800">
              {pricing.total}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  ),

  // Terms and conditions component
  TermsSection: ({ colors }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className={`w-2 h-2 bg-${colors.primary} rounded-full mt-2 flex-shrink-0`}></div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-1">Payment Terms</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              50% upfront payment required. Remaining 50% due upon completion.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <div className={`w-2 h-2 bg-${colors.secondary} rounded-full mt-2 flex-shrink-0`}></div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-1">Timeline</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Estimated 3-4 weeks from project kickoff.
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className={`w-2 h-2 bg-${colors.primary} rounded-full mt-2 flex-shrink-0`}></div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-1">Revisions</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Two rounds of revisions included in the price.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <div className={`w-2 h-2 bg-${colors.secondary} rounded-full mt-2 flex-shrink-0`}></div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-1">Deliverables</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              All source files and documentation provided.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
};

/**
 * Color schemes for templates
 */
export const ColorSchemes = {
  blue: {
    primary: 'blue-600',
    secondary: 'blue-700',
    accent: 'blue-50',
    text: 'blue-800'
  },
  emerald: {
    primary: 'emerald-600',
    secondary: 'emerald-700',
    accent: 'emerald-50',
    text: 'emerald-800'
  },
  purple: {
    primary: 'purple-600',
    secondary: 'purple-700',
    accent: 'purple-50',
    text: 'purple-800'
  },
  rose: {
    primary: 'rose-600',
    secondary: 'rose-700',
    accent: 'rose-50',
    text: 'rose-800'
  },
  indigo: {
    primary: 'indigo-600',
    secondary: 'indigo-700',
    accent: 'indigo-50',
    text: 'indigo-800'
  },
  amber: {
    primary: 'amber-600',
    secondary: 'amber-700',
    accent: 'amber-50',
    text: 'amber-800'
  },
  teal: {
    primary: 'teal-600',
    secondary: 'teal-700',
    accent: 'teal-50',
    text: 'teal-800'
  }
};

/**
 * Template builder helper
 * Makes it easy to create consistent templates
 */
export class TemplateBuilder {
  constructor(colorScheme = 'blue') {
    this.colors = ColorSchemes[colorScheme] || ColorSchemes.blue;
    this.sections = [];
  }

  // Process all data at once
  processData(data) {
    this.data = {
      company: DataProcessors.processCompany(data),
      client: DataProcessors.processClient(data),
      scopeParagraphs: DataProcessors.processScope(data),
      pricing: DataProcessors.processPricing(data)
    };
    return this;
  }

  // Add header section
  addHeader() {
    this.sections.push(
      <section key="header" className="p-8">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <TemplateComponents.CompanyLogo 
                company={this.data.company} 
                colors={this.colors} 
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {this.data.company.name}
                </h1>
                <p className="text-gray-600 text-sm">
                  {this.data.company.tagline}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className={`bg-gradient-to-r from-${this.colors.primary} to-${this.colors.secondary} text-white px-6 py-3 rounded-lg`}>
                <h2 className="text-lg font-semibold">Project Proposal</h2>
              </div>
            </div>
          </div>
          
          {/* Client & Date */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">CLIENT</label>
              <div className={`bg-${this.colors.accent} border border-gray-200 rounded-lg p-4`}>
                <p className="text-gray-800 font-medium">{this.data.client.name}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">DATE</label>
              <div className={`bg-${this.colors.accent} border border-gray-200 rounded-lg p-4`}>
                <p className="text-gray-800 font-medium">{this.data.client.date}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
    return this;
  }

  // Add scope sections
  addScope() {
    // Scope title
    this.sections.push(
      <section key="scope-title" className="p-8">
        <TemplateComponents.SectionHeader 
          title="Project Scope" 
          colors={this.colors} 
        />
      </section>
    );

    // Scope paragraphs or empty state
    if (this.data.scopeParagraphs.length) {
      this.data.scopeParagraphs.forEach((paragraph, index) => {
        this.sections.push(
          <section key={`scope-${index}`} className="px-8 pb-4">
            <p className="whitespace-pre-wrap leading-relaxed text-gray-700 text-base">
              {paragraph}
            </p>
          </section>
        );
      });
    } else {
      this.sections.push(
        <section key="scope-empty" className="px-8 pb-4">
          <div className={`bg-${this.colors.accent} rounded-lg p-6 text-center`}>
            <p className="text-gray-500 text-sm">Add your project scope details here</p>
          </div>
        </section>
      );
    }
    return this;
  }

  // Add investment section
  addInvestment() {
    this.sections.push(
      <section key="investment" className="p-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <TemplateComponents.SectionHeader 
            title="Investment Summary" 
            colors={this.colors} 
          />
          
          <TemplateComponents.PricingTable 
            pricing={this.data.pricing} 
            colors={this.colors} 
          />
          
          <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
            <span>Valid until: {this.data.pricing.validUntil}</span>
            <span>Terms & conditions apply</span>
          </div>
        </div>
      </section>
    );
    return this;
  }

  // Add terms section
  addTerms() {
    this.sections.push(
      <section key="terms" className="p-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <TemplateComponents.SectionHeader 
            title="Terms & Conditions" 
            colors={this.colors} 
          />
          
          <TemplateComponents.TermsSection colors={this.colors} />
        </div>
      </section>
    );
    return this;
  }

  // Build and return sections
  build() {
    return this.sections;
  }

  // Quick build with all standard sections
  buildStandard() {
    return this
      .addHeader()
      .addScope()
      .addInvestment()
      .addTerms()
      .build();
  }
}

/**
 * Schema generator for templates
 */
export const generateSchema = (customFields = []) => {
  const baseFields = [
    {
      section: "Company Information",
      fields: [
        { name: "company.name", label: "Company Name", type: "text", required: true },
        { name: "company.tagline", label: "Tagline", type: "text" },
        { name: "company.logo", label: "Logo URL", type: "url" }
      ]
    },
    {
      section: "Client Details",
      fields: [
        { name: "client.name", label: "Client Name", type: "text", required: true },
        { name: "client.email", label: "Email", type: "email" },
        { name: "client.phone", label: "Phone", type: "tel" },
        { name: "client.address", label: "Address", type: "textarea" }
      ]
    },
    {
      section: "Project Information",
      fields: [
        { name: "project.title", label: "Project Title", type: "text", required: true },
        { name: "project.scope", label: "Project Scope", type: "textarea", required: true, rows: 8 },
        { name: "project.timeline", label: "Timeline", type: "text" },
        { name: "project.deliverables", label: "Deliverables", type: "textarea", rows: 4 }
      ]
    },
    {
      section: "Pricing",
      fields: [
        { 
          name: "pricing.items", 
          label: "Line Items", 
          type: "textarea", 
          required: true,
          placeholder: "Service Description - €500\nAdditional Service - €300",
          rows: 6
        },
        { name: "pricing.total", label: "Total Amount", type: "text", required: true },
        { name: "pricing.validUntil", label: "Valid Until", type: "date" }
      ]
    }
  ];

  return {
    defaultData: {
      company: { name: "", tagline: "", logo: "" },
      client: { name: "", email: "", phone: "", address: "" },
      project: { title: "", scope: "", timeline: "", deliverables: "" },
      pricing: { items: "", total: "", validUntil: "" }
    },
    fields: [...baseFields, ...customFields]
  };
};
