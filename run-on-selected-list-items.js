<script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
<script type="text/javascript" src="/_layouts/15/sp.js"></script>
<script src="/_layouts/15/SP.UserProfiles.js"></script>
<script type="text/javascript" src="http://code.jquery.com/jquery-latest.js"></script>
<script type="text/javascript">


$(function () {
		
	function getSelectedItems(success,error)
	{
		var context = SP.ClientContext.get_current();
		var listId = SP.ListOperation.Selection.getSelectedList(); //selected list Id
		var selectedItemIds = SP.ListOperation.Selection.getSelectedItems(context); //selected Items Ids

		var list = context.get_web().get_lists().getById(listId);
		var listItems = [];
		for (idx in selectedItemIds)
		{
			var item = list.getItemById(parseInt(selectedItemIds[idx].id));
			listItems.push(item);
			context.load(item);
		}
 
		context.executeQueryAsync(
		   function() {
			alert("success to get selected items ");
			success(listItems);			 					
		   },
		   error); 
	}
	

     $("#Run").click(function(){
		
      
		getSelectedItems(function(items){
			//console.log(items);			
			for (var i =0 ; i < items.length;i++)
				{					
					//loginCurrent = items[i].get_item("FamilWhoLogin");			
					//console.log(items[i]);
					SP.SOD.executeOrDelayUntilScriptLoaded(function() {testCase(items[i]);}, 'SP.UserProfiles.js');
					function testCase(item){
						getUserProperties(item.get_item("FamilWhoLogin"),
							function(userproperty){
								//console.log(userproperty);
								console.log(userproperty.get_userProfileProperties()['WorkEmail']);
								console.log(userproperty.get_userProfileProperties()['Company']);
								console.log(userproperty.get_userProfileProperties()['Department']);
								item.set_item('Email', userproperty.get_userProfileProperties()['WorkEmail']);
								item.set_item('userOrg', userproperty.get_userProfileProperties()['Company']);
								item.update();
								SP.ClientContext.get_current().executeQueryAsync(
									function(sender, args) {console.log("update successfully");},
									function(sender, args) {console.log('Failed' + args.get_message() + '\n' + args.get_stackTrace());}
								)
							},function(sender,args){
							console.log('An error occured: ' + args.get_message());
							}				
						);
					};
			
					
									
				}  
				
			},function(sender,args){
				console.log('An error occured: ' + args.get_message());
			}
		);
		
    });

	function getUserProperties(user,success,error) {
        var clientContext = new SP.ClientContext.get_current();
        var peopleManager = new SP.UserProfiles.PeopleManager(clientContext);
        var userProfileProperties = peopleManager.getPropertiesFor(user);       
        clientContext.load(userProfileProperties);
        clientContext.executeQueryAsync(
		function(){
			console.log("success to get userprofile for " + user );
			success(userProfileProperties)
		}, 
		error);
	
	}
});
</script>
<input id="Run" type="button" value="Run selected"/>
