import React, { FC } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import {
	NavigationProp,
	RouteProp,
	useNavigation,
	useRoute,
} from '@react-navigation/native';
import CommentInput from 'components/CommentInput';
import { blackPearl } from 'utils/colors';

import ControllerRow from '../../components/ControllerRow';
import Post from '../../components/Post';
import { StackParamList } from '../../stack';
import { MAX_WIDTH } from '../../utils/constants';

import Reply from './Reply';

type DetailPostStackRouteProp = RouteProp<StackParamList, 'DetailPost'>;
type DetailPostNavigationProp = NavigationProp<StackParamList, 'DetailPost'>;

interface Props {
	route?: DetailPostStackRouteProp;
}

const DetailPostScreen: FC<Props> = () => {
	const route = useRoute<DetailPostStackRouteProp>();
	const navigation = useNavigation<DetailPostNavigationProp>();

	const {
		avatarUrl = '',
		name = '',
		postedTime = '',
		thread = '',
		nbLikes = 0,
		nbComments = 0,
		isPinned = false,
		isFollowed = false,
		isLiked = false,
		replies = [],
	} = route.params;

	const onAvatarPress = () => {
		navigation.navigate('SignIn');
	};

	return (
		<FlatList
			style={styles.container}
			showsVerticalScrollIndicator={false}
			ListHeaderComponent={
				<View>
					<ControllerRow canGoBack={true} onAvatarPress={onAvatarPress} />
					<View style={styles.postDetailContainer}>
						<Post
							avatarUrl={avatarUrl}
							name={name}
							postedTime={postedTime}
							thread={thread}
							nbLikes={nbLikes}
							nbComments={nbComments}
							isPinned={isPinned}
							isFollowed={isFollowed}
							isLiked={isLiked}
							isShortForm={false}
						/>
					</View>
				</View>
			}
			ListFooterComponent={
				<View style={styles.commentInputContainer}>
					<CommentInput containerStyle={styles.commentInput} />
				</View>
			}
			data={replies}
			renderItem={({ item }) => (
				<View style={styles.replyContainer}>
					<Reply
						avatarUrl={item.avatarUrl}
						name={item.name}
						postedTime={item.postedTime}
						thread={item.content}
						nbLikes={item.nbLikes || 0}
						originReply={item.originReply}
					/>
				</View>
			)}
		/>
	);
};

export default DetailPostScreen;

const styles = StyleSheet.create({
	replyContainer: {
		marginTop: 16,
	},
	container: {
		width: '100%',
		height: '100%',
		maxWidth: MAX_WIDTH,
		alignSelf: 'center',
		paddingTop: 32,
		paddingHorizontal: 15,
	},
	quickThreadContainer: {
		marginTop: 46,
	},
	threadListContainer: {
		marginTop: 24,
	},
	postDetailContainer: {
		marginTop: 13,
	},
	commentInputContainer: {
		marginVertical: 12,
	},
	commentInput: {
		backgroundColor: blackPearl,
	},
});
