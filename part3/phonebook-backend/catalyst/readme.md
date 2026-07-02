# catalyst/

a drop-in, project-independent helper for deploying any app to **zoho
catalyst appsail**. copy this whole `catalyst/` folder into any repo and it
works out of the box — nothing here is specific to this project.

## contents

```
catalyst/
├── start.sh    # your app's startup commands (fill this in)
├── zip.sh      # packages the repo into a deploy-ready zip
└── readme.md   # this file
```

## how to use

1. **copy `catalyst/` into the root of the target project.**

2. **fill in `catalyst/start.sh`** with whatever your app needs to boot —
   install deps, run a build step, start the server. it's a normal shell
   script, so `&&`, env vars, conditionals, etc. all work:

    ```sh
    npm install
    npm run start
    ```

    or, for a different stack:

    ```sh
    pip install -r requirements.txt
    python app.py
    ```

3. **run the zip script** from anywhere:

    ```sh
    sh catalyst/zip.sh
    ```

    this creates `<project-folder-name>-catalyst.zip` at the project root.

    - it respects `.gitignore` (and nested `.gitignore` files) — anything
      git wouldn't track (`node_modules`, `.env`, build output, etc.) is
      automatically left out. nothing to configure.
    - it excludes the `catalyst/` folder itself from the zip — it's a local
      deploy tool, not part of the shipped app.
    - it copies `start.sh` to the **root** of the zip, alongside your
      `package.json` (or equivalent), since catalyst requires the build
      directory to be flat — no wrapping folder.
    - requires the project to be a git repo (used only to resolve
      `.gitignore` rules; nothing needs to be committed).

4. **deploy on catalyst:**
    - go to **serverless → appsail** in your catalyst project.
    - click **deploy from console**.
    - deployment type: **catalyst-managed runtime**.
    - select the runtime matching your app (node.js, python, etc.) and
      version.
    - **startup command:**
        ```
        sh start.sh
        ```
        (do not put your actual install/run commands directly in this field —
        catalyst passes the startup command straight through without a shell,
        so operators like `&&` are rejected. always point it at `start.sh`,
        which runs as a real shell script.)
    - upload the generated `<project>-catalyst.zip` as the build directory.
    - configure port (default `9000`), memory, and env vars as needed.
    - click **deploy**.

5. **redeploying after changes:** just rerun `sh catalyst/zip.sh` and
   re-upload the new zip.

## troubleshooting

- **`cannot find module 'express'` (or any dep)**
  cause: dependencies weren't installed.
  fix: make sure `start.sh` runs the install step (e.g. `npm install`) before starting the app.

- **`invalid elf header` on a native/compiled module**
  cause: a pre-built binary was zipped from your local os (e.g. macos/windows) and is incompatible with catalyst's linux runtime.
  fix: don't zip dependency folders (`node_modules`, `venv`, etc.) — let `start.sh` install them fresh on catalyst so they're built for the right platform.

- **`could not read package.json ... /catalyst/package.json`**
  cause: the zip has a wrapping folder instead of files at its root.
  fix: use `catalyst/zip.sh` — it stages files flat, with no wrapping directory.

- **`invalid tag name "&&"`**
  cause: shell operators put directly into the catalyst startup command field.
  fix: set the startup command to `sh start.sh` and put the real commands inside that file.

- **server unreachable after deploy**
  cause: wrong/mismatched port.
  fix: make your app read `process.env.port` (or equivalent) and set the same port value in catalyst's advanced settings (default `9000`).
