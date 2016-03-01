angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function($scope, contatosAPI, operadorasAPI, serialGenerator){
			$scope.app = "Lista Telefonica";
			$scope.contatos = [];
			$scope.operadoras = [];
			var carregarContatos = function(){
				contatosAPI.getContatos().success(function(data,status){					
					$scope.contatos = data;
				}).error(function(data){
					console.log(data);
				});
			}

			var carregarOperadoras = function(){
				operadorasAPI.getOperadoras().success(function(data){
					$scope.operadoras = data;
				}).error(function(data){
					console.log(data);
				});
			}

			$scope.adicionarContato = function(contato){
				contato.serial = serialGenerator.generate();

				/*contatosAPI.saveContato(contato).success(function(data){
					delete $scope.contato;	
					$scope.contatoForm.$setPristine()	
				});*/

				$scope.contatos.push(angular.copy(contato));
				delete $scope.contato;	
				$scope.contatoForm.$setPristine();		
			}

			$scope.apagarContatos = function(contatos){
				$scope.contatos = contatos.filter(function(contato){
					if (!contato.selecionado)
						return contato;
				});
			};

			$scope.isContatoSelecionado = function(contatos){
				return contatos.some(function(contato){
					return contato.selecionado;
				});
			}

			$scope.ordernarPor = function(campo){
				$scope.criterioDeOrdenacao = campo;
				$scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
			}

			$scope.classe1 = "selecionado";
			$scope.classe2 = "negrito";
			carregarContatos();
			carregarOperadoras();
		});