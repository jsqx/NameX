<?php
/**
 * Simple Machines Forum (SMF)
 *
 * @package SMF
 * @author Simple Machines https://www.simplemachines.org
 * @copyright 2022 Simple Machines and individual contributors
 * @license https://www.simplemachines.org/about/smf/license.php BSD
 *
 * @version 2.1.3
 */

/**
 * This shows the popup that shows who likes a particular post.
 */
function template_popup()
{
	global $context, $txt, $settings;

	// Since this is a popup of its own we need to start the html, etc.
	echo '<!DOCTYPE html>
<html', $context['right_to_left'] ? ' dir="rtl"' : '', '>
	<head>
		<meta charset="', $context['character_set'], '">
		<meta name="robots" content="noindex">
		<title>', $context['page_title'], '</title>
		', template_css(), '
		<script src="', $settings['default_theme_url'], '/scripts/script.js', $context['browser_cache'], '"></script>
	</head>
	<body id="likes_popup">
		<div class="windowbg">
			<ul id="likes">';

	foreach ($context['likers'] as $liker => $like_details)
		echo '
				<li>
					', $like_details['profile']['avatar']['image'], '
					<span class="like_profile">
						', $like_details['profile']['link_color'], '
						<span class="description">', $like_details['profile']['group'], '</span>
					</span>
					<span class="floatright like_time">', $like_details['time'], '</span>
				</li>';

	echo '
			</ul>
			<br class="clear">
			<a href="javascript:self.close();">', $txt['close_window'], '</a>
		</div><!-- .windowbg -->
	</body>
</html>';
}

/**
 * Display a like button and info about how many people liked something
 */
function template_like()
{
	global $context, $scripturl, $txt;

	// Like Count
	if (!empty($context['data']['count']))
	{
		$context['some_likes'] = true;
		$count = $context['data']['count'];
		$base = 'likes_';

		if ($context['data']['already_liked'])
		{
			$base = 'you_' . $base;
			$count--;
		}

		$base .= (isset($txt[$base . $count])) ? $count : 'n';
	}

	// Quick like button?
	if (isset($_REQUEST['quickbuttonlike']))
	{
		if (!empty($context['data']['can_like']))
		echo '
		<li class="post_like_button" id="', $context['data']['type'], '_', $context['data']['id_content'], '_likes"', '>
			<a href="', $scripturl, '?action=likes;ltype=', $context['data']['type'], ';sa=like;quickbuttonlike;like=', $context['data']['id_content'], ';', $context['session_var'], '=', $context['session_id'], '" class="', $context['data']['type'], '_quicklike">
				<i class="fa fa-', $context['data']['already_liked'] ? 'unlike' : 'like', '"></i>
				<span>
					', $context['data']['already_liked'] ? $txt['unlike'] : $txt['like'], '
				</span>
			</a>';

		if (!empty($context['some_likes']))
			echo '
			<span class="amt">
				<a class="buttonlike_count" href="' . $scripturl . '?action=likes;sa=view;ltype=' . $context['data']['type'] . ';js=1;like=' . $context['data']['id_content'] . ';' . $context['session_var'] . '=' . $context['session_id'], '">
					<em style="display: none;">', $txt['likes'], '</em>
					' . $context['data']['count'] . '
				</a>
			</span>';

		echo '
		</li>';
	}

	// Regular like
	else
	{
		echo '
		<ul class="floatleft">';

		if (!empty($context['data']['can_like']))
			echo '
			<li class="smflikebutton" id="', $context['data']['type'], '_', $context['data']['id_content'], '_likes"', '>
				<a href="', $scripturl, '?action=likes;ltype=', $context['data']['type'], ';sa=like;like=', $context['data']['id_content'], ';', $context['session_var'], '=', $context['session_id'], '" class="', $context['data']['type'], '_like"><span class="main_icons ', $context['data']['already_liked'] ? 'unlike' : 'like', '"></span> ', $context['data']['already_liked'] ? $txt['unlike'] : $txt['like'], '</a>
			</li>';

		if (!empty($context['some_likes']))
			echo '
			<li class="like_count smalltext">', sprintf($txt[$base], $scripturl . '?action=likes;sa=view;ltype=' . $context['data']['type'] . ';js=1;like=' . $context['data']['id_content'] . ';' . $context['session_var'] . '=' . $context['session_id'], comma_format($count)), '</li>';

		echo '
		</ul>';
	}
}

/**
 * A generic template that outputs any data passed to it...
 */
function template_generic()
{
	global $context;

	echo $context['data'];
}

?>