import { useContext, useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";

function ManageExpense({ route, navigation }) {
	const expenseCtx = useContext(ExpensesContext);
	const editedExpenseId = route.params?.expenseId;
	//convert a value into a boolean
	const isEditing = !!editedExpenseId;

	//stops rendering everytime the component rebuilds
	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? "Edit Expense" : "Add Expense",
		});
	}, [navigation, isEditing]);

	function deleteExpenseHandler() {
		expenseCtx.deleteExpense(editedExpenseId);
		navigation.goBack();
	}

	function cancelHandler() {
		navigation.goBack();
	}

	function confirmHandler() {
		if (isEditing) {
			expenseCtx.updateExpense(editedExpenseId, {
				description: "Test 2",
				amount: 100,
				date: new Date(),
			});
		} else {
			expenseCtx.addExpense({
				description: "Test",
				amount: 19,
				date: new Date(),
			});
		}
		navigation.goBack();
	}

	return (
		<View style={styles.container}>
			<View style={styles.buttons}>
				<Button
					style={styles.button}
					mode="flat"
					onPress={cancelHandler}
				>
					Cancel
				</Button>
				<Button style={styles.button} onPress={confirmHandler}>
					{isEditing ? "Update" : "Add"}
				</Button>
			</View>
			{isEditing && (
				<View style={styles.deleteContainer}>
					<IconButton
						icon="trash"
						color={GlobalStyles.colors.error500}
						size={36}
						onPress={deleteExpenseHandler}
					/>
				</View>
			)}
		</View>
	);
}

export default ManageExpense;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: GlobalStyles.colors.primary800,
	},
	buttons: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	deleteContainer: {
		marginTop: 16,
		paddingTop: 8,
		borderTopWidth: 2,
		borderTopColor: GlobalStyles.colors.primary200,
		alignItems: "center",
	},
	button: {
		minWidth: 120,
		marginHorizontal: 8,
	},
});
