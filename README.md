# Immigration Assistant

Immigration Assistant (IA) is a project for people who need immigration information, status records, and employment options.
The aim is to help users find information that applies to their situation and decide what to do next.

This repository contains the public website for IA.
The website explains the application and links to a beta demonstration.
It does not contain the application services or the artificial intelligence model.

[View the website](https://webpager.onrender.com/)
| [View the beta demonstration](https://drive.google.com/file/d/1evz-vsDGQTiA7wBvWYEamA5HL3O2Dmlg/view?usp=sharing)

## Entry, Stay, Extend

The project covers three parts of the immigration process.

| Part | Purpose |
| --- | --- |
| Entry | Find information about entry requirements and available Global Entry interview appointments. |
| Stay | Keep immigration status records, visa dates, and important deadlines in one place. |
| Extend | Find employers that offer H-1B sponsorship and examine options for continued residence. |

## Application features

The application design includes these functions:

- **Status records:** Keep visa dates, I-94 records, and deadlines available for review.
- **Employer research:** Use H-1B employer and salary data to examine sponsorship options.
- **Resource search:** Find immigration information and support services that apply to the user.
- **Personal preferences:** Use visa type, country of origin, career goals, and dates to select relevant information.
- **Document support:** Use reference material and user documents to help explain immigration information.

The user controls the next action.
A recommendation does not authorize the application to submit a filing or contact an employer.

## Garvey AI

Garvey AI is the artificial intelligence (AI) assistant in the application design.
Its reference material includes information from U.S. Citizenship and Immigration Services (USCIS).
The design also includes support for user documents and questions about immigration status.

The project describes local processing as a privacy objective.
The model and document processing code are outside this website repository.

## Project status

The website links to a beta demonstration.
The website shows "Coming Soon" for public application access.
The demonstration and website describe the project.
This repository does not provide an application installation package.

## Website code

The website uses EJS templates to produce HTML.
The generated website runs without an application server.
Webflow, jQuery, GSAP, ScrollTrigger, and Lottie control the browser animations.

| Path | Contents |
| --- | --- |
| `views/` | EJS templates and page sections. |
| `public/` | Source CSS and JavaScript files. |
| `docs/` | Generated HTML and assets for GitHub Pages. |
| `scripts/build-static.js` | Static build script. |
| `test/` | Checks for asset paths and script integrity. |
| `server.js` | Express server for the EJS version. |

Some images, fonts, animation data, and external services require an internet connection.

## Build the static website

Node.js and npm are required.

1. Install the dependencies:

   ```sh
   npm ci
   ```

2. Run the tests:

   ```sh
   npm test
   ```

3. Build the website:

   ```sh
   npm run build
   ```

The build writes the website to `docs/`.
It preserves the animation markup and script order.
It also corrects asset paths for a GitHub Pages project URL.

## Change the website

1. Change the applicable files in `views/` or `public/`.
2. Run `npm test`.
3. Run `npm run build`.
4. Commit the source changes and the generated files in `docs/`.

For an EJS preview, run `npm start`.
Then open [localhost:3004](http://localhost:3004).

## Publish with GitHub Pages

1. Open the repository settings on GitHub.
2. Select **Pages**.
3. Select **Deploy from a branch**.
4. Select the **main** branch.
5. Select the **/docs** folder.
6. Select **Save**.

See [Static hosting](STATIC-HOSTING.md) for more information about the build and other hosting options.
