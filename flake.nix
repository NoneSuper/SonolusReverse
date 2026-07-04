{ 
  description = "SonolusReverse development environment";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    nixpkgs,
    flake-utils,
    ...
  }:
  flake-utils.lib.eachDefaultSystem (system: 
    let 
      pkgs = import nixpkgs { inherit system; };
    in {
      devShells.default = pkgs.mkShell {
        buildInputs = with pkgs; [
          nodejs
          python314
          python314Packages.pip
        ];

        # This is will work only on linux prob, even we have this flake for all platforms
        shellHook = ''
          if [ ! -d ".venv" ]; then
            echo "Creating python virtual environment, don't forget to install requirements!"
            python -m venv .venv
          fi
          
          source .venv/bin/activate
        '';
      };
    }
  );
}
